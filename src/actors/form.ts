import { assign, forwardTo, setup, type ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";

export const actorWithValue = setup({
  types: {
    context: {} as { text: string },
    events: {} as { type: "change"; value: string } | { type: "submit" },
  },
}).createMachine({
  context: { text: "" },
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

export const actorSendTo = setup({
  types: {
    context: {} as {
      text: string;
      textActor: ActorRefFrom<typeof InputTextActor.actorSendTo>;
    },
    events: {} as { type: "submit" } | { type: "change"; value: string },
  },
}).createMachine({
  context: ({ spawn, self }) => ({
    text: "",
    textActor: spawn(InputTextActor.actorSendTo, {
      input: { parentRef: self },
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

export const actorWithRef = setup({
  types: {
    context: {} as {
      textActor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn }) => ({
    textActor: spawn(InputTextActor.actorIndependent),
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

export const actorInvoke = setup({
  types: {
    events: {} as { type: "submit"; formData: FormData },
    children: {} as {
      textActorId: "textActorSrc";
    },
  },
  actors: { textActorSrc: InputTextActor.actorIndependent },
}).createMachine({
  invoke: {
    id: "textActorId",
    src: "textActorSrc",
  },
  on: {
    submit: {
      actions: ({ event }) => {
        console.log({
          text: event.formData.get("text"),
        });
      },
    },
  },
});

export const actorSendParent = setup({
  types: {
    context: {} as { text: string },
    events: {} as { type: "submit" } | { type: "change"; value: string },
    children: {} as {
      textActorId: "textActorSrc";
    },
  },
  actors: {
    textActorSrc: InputTextActor.actorSendParent,
  },
}).createMachine({
  context: { text: "" },
  invoke: { id: "textActorId", src: "textActorSrc" },
  on: {
    change: {
      actions: assign(({ event }) => ({ text: event.value })),
    },
    submit: {
      actions: [
        ({ context }) => {
          console.log({ text: context.text });
        },
        forwardTo("textActorId"),
      ],
    },
  },
});
