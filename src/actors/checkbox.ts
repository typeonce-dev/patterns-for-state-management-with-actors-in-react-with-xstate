import { assign, setup } from "xstate";

export const actor = setup({
  types: {
    input: {} as { defaultChecked: boolean | undefined },
    context: {} as { checked: boolean },
    events: {} as { type: "toggle" },
  },
}).createMachine({
  context: ({ input }: { input: { defaultChecked: boolean | undefined } }) => ({
    checked: input.defaultChecked ?? false,
  }),
  on: {
    toggle: {
      actions: assign(({ context }) => ({ checked: !context.checked })),
    },
  },
});
