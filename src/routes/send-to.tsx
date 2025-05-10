import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextSendTo } from "../components/input-text";

export const Route = createFileRoute("/send-to")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorSendTo);
  return (
    <form action={() => send({ type: "submit" })}>
      <InputTextSendTo name="text" actor={snapshot.context.textActor} />
      <button type="submit">Submit</button>
    </form>
  );
}
