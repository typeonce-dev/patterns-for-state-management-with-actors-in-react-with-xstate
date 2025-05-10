import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/no-actors")({ component: App });

function App() {
  const [text, setText] = useState("");
  return (
    <form action={() => console.log({ text })}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
