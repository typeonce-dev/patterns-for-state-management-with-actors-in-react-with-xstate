import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/with-ref" search={{ text: "ref" }}>
        With Ref
      </Link>
      <Link to="/with-value" search={{ text: "value" }}>
        With Value
      </Link>
      <Link to="/send-to" search={{ text: "send-to" }}>
        Send To
      </Link>
      <Link to="/parent-ref" search={{ text: "parent-ref" }}>
        Parent Ref
      </Link>
      <Link to="/invoke" search={{ text: "invoke" }}>
        Invoke
      </Link>
    </nav>
  );
}
