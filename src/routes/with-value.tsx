import { createFileRoute } from "@tanstack/react-router";
import { useActor } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputText, InputTextSharedMachine } from "../components/input-text";

export const Route = createFileRoute("/with-value")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const { text } = Route.useSearch();
  const [snapshot, send] = useActor(FormActor.actorWithValue, {
    input: { text },
  });

  return (
    <>
      <form action={() => send({ type: "submit" })}>
        <InputText
          name="text"
          value={snapshot.context.text}
          onChange={(value) => send({ type: "change", value })}
        />
        <button type="submit">Submit</button>
      </form>

      <form action={() => send({ type: "submit" })}>
        <InputTextSharedMachine name="text" send={send} snapshot={snapshot} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
