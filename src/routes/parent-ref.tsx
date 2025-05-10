import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextParentRef } from "../components/input-text";

export const Route = createFileRoute("/parent-ref")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const { text } = Route.useSearch();
  const [snapshot, send] = useMachine(FormActor.actorSendTo, {
    input: { text },
  });

  return (
    <form action={() => send({ type: "submit" })}>
      <InputTextParentRef name="text" actor={snapshot.context.textActor} />
      <button type="submit">Submit</button>
    </form>
  );
}
