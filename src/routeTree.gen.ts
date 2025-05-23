/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as WithValueImport } from './routes/with-value'
import { Route as WithRefImport } from './routes/with-ref'
import { Route as SendToImport } from './routes/send-to'
import { Route as SendParentImport } from './routes/send-parent'
import { Route as NoActorsImport } from './routes/no-actors'
import { Route as InvokeImport } from './routes/invoke'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const WithValueRoute = WithValueImport.update({
  id: '/with-value',
  path: '/with-value',
  getParentRoute: () => rootRoute,
} as any)

const WithRefRoute = WithRefImport.update({
  id: '/with-ref',
  path: '/with-ref',
  getParentRoute: () => rootRoute,
} as any)

const SendToRoute = SendToImport.update({
  id: '/send-to',
  path: '/send-to',
  getParentRoute: () => rootRoute,
} as any)

const SendParentRoute = SendParentImport.update({
  id: '/send-parent',
  path: '/send-parent',
  getParentRoute: () => rootRoute,
} as any)

const NoActorsRoute = NoActorsImport.update({
  id: '/no-actors',
  path: '/no-actors',
  getParentRoute: () => rootRoute,
} as any)

const InvokeRoute = InvokeImport.update({
  id: '/invoke',
  path: '/invoke',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/invoke': {
      id: '/invoke'
      path: '/invoke'
      fullPath: '/invoke'
      preLoaderRoute: typeof InvokeImport
      parentRoute: typeof rootRoute
    }
    '/no-actors': {
      id: '/no-actors'
      path: '/no-actors'
      fullPath: '/no-actors'
      preLoaderRoute: typeof NoActorsImport
      parentRoute: typeof rootRoute
    }
    '/send-parent': {
      id: '/send-parent'
      path: '/send-parent'
      fullPath: '/send-parent'
      preLoaderRoute: typeof SendParentImport
      parentRoute: typeof rootRoute
    }
    '/send-to': {
      id: '/send-to'
      path: '/send-to'
      fullPath: '/send-to'
      preLoaderRoute: typeof SendToImport
      parentRoute: typeof rootRoute
    }
    '/with-ref': {
      id: '/with-ref'
      path: '/with-ref'
      fullPath: '/with-ref'
      preLoaderRoute: typeof WithRefImport
      parentRoute: typeof rootRoute
    }
    '/with-value': {
      id: '/with-value'
      path: '/with-value'
      fullPath: '/with-value'
      preLoaderRoute: typeof WithValueImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/invoke': typeof InvokeRoute
  '/no-actors': typeof NoActorsRoute
  '/send-parent': typeof SendParentRoute
  '/send-to': typeof SendToRoute
  '/with-ref': typeof WithRefRoute
  '/with-value': typeof WithValueRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/invoke': typeof InvokeRoute
  '/no-actors': typeof NoActorsRoute
  '/send-parent': typeof SendParentRoute
  '/send-to': typeof SendToRoute
  '/with-ref': typeof WithRefRoute
  '/with-value': typeof WithValueRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/invoke': typeof InvokeRoute
  '/no-actors': typeof NoActorsRoute
  '/send-parent': typeof SendParentRoute
  '/send-to': typeof SendToRoute
  '/with-ref': typeof WithRefRoute
  '/with-value': typeof WithValueRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/invoke'
    | '/no-actors'
    | '/send-parent'
    | '/send-to'
    | '/with-ref'
    | '/with-value'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/invoke'
    | '/no-actors'
    | '/send-parent'
    | '/send-to'
    | '/with-ref'
    | '/with-value'
  id:
    | '__root__'
    | '/'
    | '/invoke'
    | '/no-actors'
    | '/send-parent'
    | '/send-to'
    | '/with-ref'
    | '/with-value'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  InvokeRoute: typeof InvokeRoute
  NoActorsRoute: typeof NoActorsRoute
  SendParentRoute: typeof SendParentRoute
  SendToRoute: typeof SendToRoute
  WithRefRoute: typeof WithRefRoute
  WithValueRoute: typeof WithValueRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  InvokeRoute: InvokeRoute,
  NoActorsRoute: NoActorsRoute,
  SendParentRoute: SendParentRoute,
  SendToRoute: SendToRoute,
  WithRefRoute: WithRefRoute,
  WithValueRoute: WithValueRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/invoke",
        "/no-actors",
        "/send-parent",
        "/send-to",
        "/with-ref",
        "/with-value"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/invoke": {
      "filePath": "invoke.tsx"
    },
    "/no-actors": {
      "filePath": "no-actors.tsx"
    },
    "/send-parent": {
      "filePath": "send-parent.tsx"
    },
    "/send-to": {
      "filePath": "send-to.tsx"
    },
    "/with-ref": {
      "filePath": "with-ref.tsx"
    },
    "/with-value": {
      "filePath": "with-value.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
