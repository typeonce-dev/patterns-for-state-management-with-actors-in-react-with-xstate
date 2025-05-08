import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { setup, type ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";
import InputText from "../components/input-text";

export const Route = createFileRoute("/")({
  component: App,
});

const machine = setup({
  types: {
    context: {} as {
      text1: ActorRefFrom<typeof InputTextActor.actor>;
      text2: ActorRefFrom<typeof InputTextActor.actor>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn }) => ({
    text1: spawn(InputTextActor.actor, {
      input: { defaultValue: "Hello" },
    }),
    text2: spawn(InputTextActor.actor, {
      input: { defaultValue: "World" },
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
  const [snapshot, send] = useMachine(machine);
  return (
    <form action={(formData) => send({ type: "submit", formData })}>
      <InputText name="text1" actor={snapshot.context.text1} />
      <InputText name="text2" actor={snapshot.context.text2} />
      <button type="submit">Submit</button>
    </form>
  );
}
