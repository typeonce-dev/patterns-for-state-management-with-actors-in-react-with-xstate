import { assertEvent, assign, setup, type ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";

/**
 * Values and logic all stored inside parent.
 *
 * Child receives `onChange` and `text` value directly.
 */
export const actorWithValue = setup({
  types: {
    input: {} as { text: string | undefined },
    context: {} as { text: string },
    events: {} as { type: "change"; value: string } | { type: "submit" },
  },
}).createMachine({
  context: ({ input }) => ({ text: input.text ?? "" }),
  on: {
    change: {
      actions: assign(({ event }) => ({ text: event.value })),
    },
    submit: {
      actions: ({ context }) => {
        console.log({ text: context.text });
      },
    },
  },
});

/**
 * Provide reference to `self` to child actor.
 *
 * Child shares `ActorParentRefEvent` and `text` with parent (`sendTo`).
 */
export const actorSendTo = setup({
  types: {
    input: {} as { text: string | undefined },
    context: {} as {
      text: string;
      textActor: ActorRefFrom<typeof InputTextActor.actorSendTo>;
    },
    events: {} as { type: "submit" } | InputTextActor.ActorSendToEvent,
  },
}).createMachine({
  context: ({ spawn, input, self }) => ({
    text: "",
    textActor: spawn(InputTextActor.actorSendTo, {
      input: { defaultValue: input.text, parentRef: self },
    }),
  }),
  on: {
    change: {
      actions: assign(({ event }) => ({ text: event.value })),
    },
    submit: {
      actions: ({ context }) => {
        console.log({ text: context.text });
      },
    },
  },
});

/**
 * Reference to child actor inside `context`.
 *
 * Access value from `FromData` on submit *or* directly from child snapshot.
 */
export const actorWithRef = setup({
  types: {
    input: {} as { text: string | undefined },
    context: {} as {
      textActor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn, input }) => ({
    textActor: spawn(InputTextActor.actorIndependent, {
      input: { defaultValue: input.text },
    }),
  }),
  on: {
    submit: {
      actions: ({ event, context }) => {
        console.log({ text: event.formData.get("text") });
        console.log({ text: context.textActor.getSnapshot().context.value });
      },
    },
  },
});

/**
 * No reference to child actor inside `context`.
 *
 * Child actor is invoked with `invoke` in the root of the machine.
 */
type InputInvoke = { text: string | undefined };
export const actorInvoke = setup({
  types: {
    input: {} as InputInvoke,
    events: {} as
      | { type: "submit" }
      | { type: "xstate.init"; input: InputInvoke },
    children: {} as { textActor: "textActor" },
  },
  actors: { textActor: InputTextActor.actorIndependent },
}).createMachine({
  invoke: {
    id: "textActor",
    src: "textActor",
    input: ({ event }) => {
      assertEvent(event, "xstate.init");
      return { defaultValue: event.input.text };
    },
  },
  on: {
    submit: {
      actions: ({ context }) => {
        console.log({ text: context.textActor.getSnapshot().context.value });
      },
    },
  },
});

/**
 * Child actor is independent, no reference to parent.
 *
 * Shared event with child `sendTo` using parent `id` and `system`.
 */
export const actorReceptionist = setup({
  types: {
    input: {} as { text: string | undefined },
    context: {} as {
      text: string;
      textActor: ActorRefFrom<typeof InputTextActor.actorReceptionist>;
    },
    events: {} as { type: "submit" } | InputTextActor.ActorReceptionistEvent,
  },
}).createMachine({
  id: "form",
  context: ({ spawn, input }) => ({
    text: "",
    textActor: spawn(InputTextActor.actorReceptionist, {
      input: { defaultValue: input.text },
    }),
  }),
  on: {
    change: {
      actions: assign(({ event }) => ({ text: event.value })),
    },
    submit: {
      actions: ({ context }) => {
        console.log({ text: context.text });
      },
    },
  },
});
