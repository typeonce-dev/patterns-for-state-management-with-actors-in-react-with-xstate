# Patterns for state management with actors in React with XState
Actors are ideal for state management, and XState has all you need to implement them in React. 

This repository contains examples of how to create and combine actors with [`xstate`](https://xstate.js.org/):

- [All the logic inside a single actor](./src/routes/with-value.tsx)
- [Child sending events to parent reference](./src/routes/with-ref.tsx)
- [Parent with reference to child inside context](./src/routes/send-to.tsx)
- [Parent invokes child](./src/routes/invoke.tsx)
- [Send to parent, forward to child](./src/routes/send-parent.tsx)

> Read the full article for all the details of the implementation: [Patterns for state management with actors in React with XState](https://www.typeonce.dev/article/patterns-for-state-management-with-actors-in-react-with-xstate) 👈