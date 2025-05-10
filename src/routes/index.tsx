import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/with-value">With Value</Link>
      <Link to="/with-ref">With Ref</Link>
      <Link to="/send-to">Send To</Link>
      <Link to="/invoke">Invoke</Link>
      <Link to="/send-parent">Send Parent</Link>
    </nav>
  );
}
