import { useSelector } from "@xstate/react";
import type { ActorRefFrom, SnapshotFrom } from "xstate";
import * as FormActor from "../actors/form";
import * as InputTextActor from "../actors/input-text";

const InputText = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const InputTextSharedMachine = ({
  send,
  snapshot,
}: {
  snapshot: SnapshotFrom<typeof FormActor.actorWithValue>;
  send: ActorRefFrom<typeof FormActor.actorWithValue>["send"];
}) => {
  return (
    <input
      type="text"
      value={snapshot.context.text}
      onChange={(e) => send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextSendTo = ({
  actor,
}: {
  actor: ActorRefFrom<typeof InputTextActor.actorSendTo>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextWithActor = ({
  name,
  actor,
}: {
  name: string;
  actor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextInvoke = ({
  name,
  actor,
}: {
  name: string;
  actor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextSendParent = ({
  actor,
}: {
  actor: ActorRefFrom<typeof InputTextActor.actorSendParent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

export {
  InputText,
  InputTextInvoke,
  InputTextSendParent,
  InputTextSendTo,
  InputTextSharedMachine,
  InputTextWithActor,
};
