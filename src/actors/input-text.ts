import { assign, setup } from "xstate";

export const actor = setup({
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
