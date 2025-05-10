import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextInvoke } from "../components/input-text";

export const Route = createFileRoute("/invoke")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorInvoke);
  return (
    <form action={() => send({ type: "submit" })}>
      {snapshot.children.textActor && (
        <InputTextInvoke name="text" actor={snapshot.children.textActor} />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
