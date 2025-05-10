import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextWithActor } from "../components/input-text";

export const Route = createFileRoute("/with-ref")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorWithRef);
  return (
    <form action={(formData) => send({ type: "submit", formData })}>
      <InputTextWithActor name="text" actor={snapshot.context.textActor} />
      <button type="submit">Submit</button>
    </form>
  );
}
