import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/with-ref" search={{ text: "test" }}>
        With Ref
      </Link>
      <Link to="/with-value" search={{ text: "test" }}>
        With Value
      </Link>
      <Link to="/send-to" search={{ text: "test" }}>
        Send To
      </Link>
      <Link to="/parent-ref" search={{ text: "test" }}>
        Parent Ref
      </Link>
    </nav>
  );
}
