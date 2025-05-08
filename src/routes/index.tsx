import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { setup, type ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";
import InputText from "../components/input-text";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: (search) => {
    return {
      text1: search.text1 as string | undefined,
      text2: search.text2 as string | undefined,
    };
  },
});

const machine = setup({
  types: {
    input: {} as { text1: string | undefined; text2: string | undefined },
    context: {} as {
      text1: ActorRefFrom<typeof InputTextActor.actor>;
      text2: ActorRefFrom<typeof InputTextActor.actor>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn, input }) => ({
    text1: spawn(InputTextActor.actor, {
      input: { defaultValue: input.text1 },
    }),
    text2: spawn(InputTextActor.actor, {
      input: { defaultValue: input.text2 },
    }),
  }),
  on: {
    submit: {
      actions: ({ event }) => {
        console.log(Array.from(event.formData.entries()));
      },
    },
  },
});

function App() {
  const { text1, text2 } = Route.useSearch();
  const [snapshot, send] = useMachine(machine, {
    input: { text1, text2 },
  });
  return (
    <form action={(formData) => send({ type: "submit", formData })}>
      <InputText name="text1" actor={snapshot.context.text1} />
      <InputText name="text2" actor={snapshot.context.text2} />
      <button type="submit">Submit</button>
    </form>
  );
}
