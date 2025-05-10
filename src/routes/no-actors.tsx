import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/no-actors")({
  component: App,
  validateSearch: (search) => {
    return { text: search.text as string | undefined };
  },
});

function App() {
  const search = Route.useSearch();
  const [text, setText] = useState(search.text ?? "");
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
