import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { setup, type ActorRefFrom } from "xstate";
import * as CheckboxActor from "../actors/checkbox";
import * as InputTextActor from "../actors/input-text";
import Checkbox from "../components/checkbox";
import InputText from "../components/input-text";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: (search) => {
    return {
      text1: search.text1 as string | undefined,
      text2: search.text2 as string | undefined,
      checkbox1: search.checkbox1 as string | undefined,
    };
  },
});

const machine = setup({
  types: {
    input: {} as {
      text1: string | undefined;
      text2: string | undefined;
      checkbox1: string | undefined;
    },
    context: {} as {
      text1: ActorRefFrom<typeof InputTextActor.actor>;
      text2: ActorRefFrom<typeof InputTextActor.actor>;
      checkbox1: ActorRefFrom<typeof CheckboxActor.actor>;
    },
    events: {} as { type: "submit"; formData: FormData },
  },
}).createMachine({
  context: ({ spawn, input }) => ({
    text1: spawn(InputTextActor.actor, {
      systemId: "text1",
      input: { defaultValue: input.text1 },
    }),
    text2: spawn(InputTextActor.actor, {
      systemId: "text2",
      input: { defaultValue: input.text2 },
    }),
    checkbox1: spawn(CheckboxActor.actor, {
      systemId: "checkbox1",
      input: { defaultChecked: input.checkbox1 === "on" },
    }),
  }),
  on: {
    submit: {
      actions: ({ event }) => {
        console.log({
          text1: event.formData.get("text1"),
          text2: event.formData.get("text2"),
          checkbox1: event.formData.get("checkbox1") === "on",
        });
      },
    },
  },
});

function App() {
  const { text1, text2, checkbox1 } = Route.useSearch();
  const [snapshot, send] = useMachine(machine, {
    input: { text1, text2, checkbox1 },
  });
  return (
    <form action={(formData) => send({ type: "submit", formData })}>
      <InputText name="text1" actor={snapshot.context.text1} />
      <InputText name="text2" actor={snapshot.context.text2} />
      <Checkbox
        id="checkbox1"
        name="checkbox1"
        actor={snapshot.context.checkbox1}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
