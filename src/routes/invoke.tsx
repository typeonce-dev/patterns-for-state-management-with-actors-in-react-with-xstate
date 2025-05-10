import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextInvoke } from "../components/input-text";

export const Route = createFileRoute("/invoke")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const { text } = Route.useSearch();
  const [snapshot, send] = useMachine(FormActor.actorInvoke, {
    input: { text },
  });

  return (
    <form action={() => send({ type: "submit" })}>
      {snapshot.children.textActor && (
        <InputTextInvoke name="text" actor={snapshot.children.textActor} />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
