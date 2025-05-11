import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextInvoke } from "../components/input-text";

export const Route = createFileRoute("/invoke")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorInvoke);
  return (
    <form action={(formData) => send({ type: "submit", formData })}>
      {snapshot.children.textActorId && (
        <InputTextInvoke name="text" actor={snapshot.children.textActorId} />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
