import { assign, sendTo, setup, type AnyActorRef } from "xstate";

/**
 * Generic reference to parent actor, shared events and values using `sendTo`.
 */
export type ActorSendToEvent = { type: "change"; value: string };
export const actorSendTo = setup({
  types: {
    input: {} as { defaultValue: string | undefined; parentRef: AnyActorRef },
    context: {} as { value: string; parentRef: AnyActorRef },
    events: {} as { type: "change"; value: string },
  },
}).createMachine({
  context: ({
    input,
  }: {
    input: { defaultValue: string | undefined; parentRef: AnyActorRef };
  }) => ({
    value: input.defaultValue ?? "",
    parentRef: input.parentRef,
  }),
  on: {
    change: {
      actions: [
        assign(({ event }) => ({ value: event.value })),
        sendTo(
          ({ context }) => context.parentRef,
          ({ event }) =>
            ({
              type: "change",
              value: event.value,
            }) satisfies ActorSendToEvent
        ),
      ],
    },
  },
});

/**
 * Independent actor, no reference to parent, isolated logic.
 */
export const actorIndependent = setup({
  types: {
    input: {} as { defaultValue: string | undefined },
    context: {} as { value: string },
    events: {} as { type: "change"; value: string },
  },
}).createMachine({
  context: ({ input }: { input: { defaultValue: string | undefined } }) => ({
    value: input.defaultValue ?? "",
  }),
  on: {
    change: { actions: assign(({ event }) => ({ value: event.value })) },
  },
});

/**
 * No parent reference, `sendTo` accesses parent from `system`.
 */
export type ActorReceptionistEvent = { type: "change"; value: string };
export const actorReceptionist = setup({
  types: {
    input: {} as { defaultValue: string | undefined },
    context: {} as { value: string },
    events: {} as { type: "change"; value: string },
  },
}).createMachine({
  context: ({ input }: { input: { defaultValue: string | undefined } }) => ({
    value: input.defaultValue ?? "",
  }),
  on: {
    change: {
      actions: [
        assign(({ event }) => ({ value: event.value })),
        sendTo(
          ({ system }) => system.get("form"),
          ({ event }) =>
            ({
              type: "change",
              value: event.value,
            }) satisfies ActorReceptionistEvent
        ),
      ],
    },
  },
});
