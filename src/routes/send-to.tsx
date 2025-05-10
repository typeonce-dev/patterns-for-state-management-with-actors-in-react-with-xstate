import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextSendTo } from "../components/input-text";

export const Route = createFileRoute("/send-to")({
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
      <InputTextSendTo name="text" actor={snapshot.context.textActor} />
      <button type="submit">Submit</button>
    </form>
  );
}
