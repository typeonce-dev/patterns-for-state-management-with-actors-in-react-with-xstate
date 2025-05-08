import { useSelector } from "@xstate/react";
import type { ActorRefFrom } from "xstate";
import * as InputTextActor from "../actors/input-text";

export default function InputText({
  name,
  actor,
}: {
  name: string;
  actor: ActorRefFrom<typeof InputTextActor.actor>;
}) {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
}
