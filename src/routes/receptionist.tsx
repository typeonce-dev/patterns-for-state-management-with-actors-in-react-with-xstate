import { createFileRoute } from "@tanstack/react-router";
import { useActorRef } from "@xstate/react";
import * as FormActor from "../actors/form";
import { InputTextReceptionist } from "../components/input-text";

export const Route = createFileRoute("/receptionist")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const { text } = Route.useSearch();
  const actor = useActorRef(FormActor.actorReceptionist, {
    input: { text },
  });

  return (
    <form action={() => actor.send({ type: "submit" })}>
      <InputTextReceptionist name="text" defaultValue={text} />
      <button type="submit">Submit</button>
    </form>
  );
}
