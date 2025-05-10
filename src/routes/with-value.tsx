import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputText } from "../components/input-text";

export const Route = createFileRoute("/with-value")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const { text } = Route.useSearch();
  const [snapshot, send] = useMachine(FormActor.actorWithValue, {
    input: { text },
  });

  return (
    <form action={() => send({ type: "submit" })}>
      <InputText
        name="text"
        value={snapshot.context.text}
        onChange={(value) => send({ type: "change", value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
