import { assign, setup, type ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";

/**
 * Reference to child actor inside `context`.
 *
 * Access value from `FromData` on submit.
 */
export const actorWithRef = setup({
  types: {
    input: {} as { text: string | undefined },
    context: {} as {
      textActor: ActorRefFrom<typeof InputTextActor.actorShared>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn, input }) => ({
    textActor: spawn(InputTextActor.actorShared, {
      input: { defaultValue: input.text },
    }),
  }),
  on: {
    submit: {
      actions: ({ event }) => {
        console.log({ text: event.formData.get("text") });
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
      textActor: ActorRefFrom<typeof InputTextActor.actorParentRef>;
    },
    events: {} as { type: "submit" } | InputTextActor.ActorParentRefEvent,
  },
}).createMachine({
  context: ({ spawn, input, self }) => ({
    text: "",
    textActor: spawn(InputTextActor.actorParentRef, {
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
