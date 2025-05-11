import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextSendParent } from "../components/input-text";

export const Route = createFileRoute("/send-parent")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorSendParent);
  return (
    <form action={() => send({ type: "submit" })}>
      {snapshot.children.textActorId && (
        <InputTextSendParent actor={snapshot.children.textActorId} />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
