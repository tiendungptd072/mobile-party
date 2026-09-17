# Architecture

## Principles

Mobile Party is content-first, static-first, server-first, type-safe, and
dependency-light. Prefer build-time work and Server Components. Add client code
only for interactions or browser APIs.

No MVP feature requires a backend, database, authentication, Server Action, or
API route.

## Stack

- Bun for package management and scripts
- Next.js 16 App Router
- React and strict TypeScript
- Tailwind CSS 4
- MDX or structured TypeScript content
- Shiki for server-side syntax highlighting
- `localStorage` for device-local preferences and progress

## Project structure

The existing root `app/` directory remains the routing layer. Shared source
code lives under `src/`, while repository-owned educational data lives under
`content/`.

```text
app/
  globals.css
  layout.tsx
  page.tsx
  learn/
  compare/
  dictionary/
  recipes/
  bookmarks/

content/
  concepts/
  recipes/
  roadmaps/
  technologies/

src/
  components/
    ui/
    layout/
    navigation/
    code/
    compare/
    learning/
  features/
    technology-switcher/
    learning-progress/
    bookmarks/
    search/
    theme/
  lib/
    content/
    search/
    storage/
    utils/
  types/
```

Directories are created when their phase introduces real files. Empty folder
scaffolding is avoided.

## Dependency direction

```text
app -> components -> lib -> types
app -> lib/content -> content
features -> lib/types
```

Lower layers must not import route modules. Generic UI must not read content or
know public URLs. UI components never access the file system directly.

## Rendering boundaries

Routes, layouts, content loaders, MDX rendering, and Shiki highlighting are
server-side by default. Small Client Components are permitted for selectors,
browser storage, search dialogs, tabs, theme controls, bookmarks, and progress.

Do not turn a route or large layout into a Client Component when only one child
requires interaction.

## Content flow

```text
content files
  -> build-time loader
  -> schema validation
  -> typed domain model
  -> static route
  -> server-rendered presentation
  -> optional small client interaction
```

Metadata is the source of truth for navigation, search, related concepts, and
static parameters. Do not maintain duplicate concept lists in components.

## Routing and static generation

Public identifiers use stable `kebab-case` slugs and canonical technology IDs.
Concept and recipe pages should expose static parameters and route metadata.
Missing resources resolve through `notFound()` at the route boundary.

Technology-pair URLs include both IDs. A technology switch preserves the
current concept only when content exists for the new pair.

## State ownership

Use state in this order:

1. derived values
2. URL state for shareable selections
3. local component state
4. Context only for truly shared, small state

Persist browser-only data through typed utilities in `src/lib/storage`. Storage
reads must not occur during Server Component rendering.

Reserved storage keys include:

```text
mobile-guide:theme
mobile-guide:bookmarks
mobile-guide:progress
```

## Styling and theme

Tailwind utilities are the primary styling mechanism. Global CSS defines
semantic tokens such as background, foreground, surface, muted text, border,
and accent. Components consume tokens instead of hard-coded light/dark pairs.

The root layout initializes a persisted theme before visible content. System
theme remains the default. Theme-dependent code highlighting will consume the
same UI theme when the code system is introduced.

## Code highlighting

Shiki configuration will be centralized under `src/lib` and executed on the
server. Supported initial languages are `tsx`, `typescript`, `dart`, `kotlin`,
`swift`, `json`, and `bash`. The browser bundle must not include Shiki without a
documented need.

## Search

The search index is generated from validated content during the build. Search
and keyboard navigation run client-side over the static index. The MVP does not
use an external service or search endpoint.

## Validation and failure behavior

Content validation must fail the build for missing required fields, invalid
technology IDs, invalid relationships, duplicate slugs, or broken canonical
references. Optional framework implementations render an explicit unavailable
state rather than failing a whole page.

## Performance and accessibility

- Prefer static rendering and minimal hydration.
- Load heavy interactive UI only when needed.
- Use semantic landmarks and native controls.
- Preserve keyboard access and visible focus.
- Never communicate relationship meaning through color alone.
- Stack or tab comparisons on narrow screens instead of forcing four columns.

## Architecture decisions

- Keep the valid existing root `app/` layout rather than moving it solely for
  convention.
- Keep content outside UI modules so it can drive Learn, Compare, Dictionary,
  and Recipes from one source of truth.
- Use browser storage only through feature-scoped or shared typed utilities.
- Add dependencies only when Next.js, React, the browser, or a small local
  utility cannot satisfy the requirement clearly.
