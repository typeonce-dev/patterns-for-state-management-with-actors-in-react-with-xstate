import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputText, InputTextSharedMachine } from "../components/input-text";

export const Route = createFileRoute("/with-value")({ component: App });

function App() {
  const [snapshot, send] = useActor(FormActor.actorWithValue);
  return (
    <>
      <form action={() => send({ type: "submit" })}>
        <InputText
          value={snapshot.context.text}
          onChange={(value) => send({ type: "change", value })}
        />
        <button type="submit">Submit</button>
      </form>

      <form action={() => send({ type: "submit" })}>
        <InputTextSharedMachine send={send} snapshot={snapshot} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
