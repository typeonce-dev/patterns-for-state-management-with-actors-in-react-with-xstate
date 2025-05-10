import { assign, sendParent, sendTo, setup, type AnyActorRef } from "xstate";

export const actorSendTo = setup({
  types: {
    input: {} as { parentRef: AnyActorRef },
    context: {} as { value: string; parentRef: AnyActorRef },
    events: {} as { type: "change"; value: string },
  },
}).createMachine({
  context: ({ input }: { input: { parentRef: AnyActorRef } }) => ({
    parentRef: input.parentRef,
    value: "",
  }),
  on: {
    change: {
      actions: [
        assign(({ event }) => ({ value: event.value })),
        sendTo(
          ({ context }) => context.parentRef,
          ({ event }) => ({
            type: "change",
            value: event.value,
          })
        ),
      ],
    },
  },
});

export const actorIndependent = setup({
  types: {
    context: {} as { value: string },
    events: {} as { type: "change"; value: string },
  },
}).createMachine({
  context: { value: "" },
  on: {
    change: { actions: assign(({ event }) => ({ value: event.value })) },
  },
});

export const actorSendParent = setup({
  types: {
    context: {} as { value: string },
    events: {} as { type: "change"; value: string } | { type: "submit" },
  },
}).createMachine({
  context: { value: "" },
  on: {
    submit: {
      actions: assign({ value: "" }),
    },
    change: {
      actions: [
        assign(({ event }) => ({ value: event.value })),
        sendParent(({ event }) => ({
          type: "change",
          value: event.value,
        })),
      ],
    },
  },
});
