import { useSelector } from "@xstate/react";
import type { ActorRefFrom } from "xstate";
import * as CheckboxActor from "../actors/checkbox";

export default function Checkbox({
  id,
  name,
  actor,
}: {
  id: string;
  name: string;
  actor: ActorRefFrom<typeof CheckboxActor.actor>;
}) {
  const checked = useSelector(actor, (snapshot) => snapshot.context.checked);
  return (
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={() => actor.send({ type: "toggle" })}
    />
  );
}
