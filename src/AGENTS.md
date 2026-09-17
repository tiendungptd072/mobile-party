# Source Code Instructions

These rules apply to files under `src/`.

## General

Follow the root `AGENTS.md`.

Keep implementations simple and local to the requested feature.

Before creating new code:

1. inspect the target file
2. inspect directly related components
3. search for an existing implementation pattern
4. reuse existing utilities and components when possible

Do not scan unrelated parts of the repository.

## Next.js

Use Server Components by default.

Use `"use client"` only when necessary for:

- user interaction
- browser APIs
- local interactive state
- client-only libraries

Keep client boundaries as small as possible.

Do not convert an entire page to a Client Component when only one child needs client behavior.

## Components

Component categories:

```text
components/
  ui/          generic reusable UI
  comparison/  framework comparison components
  code/        code display and syntax highlighting
```

Prefer composition.

Avoid large components.

Split a component when:

- it has multiple unrelated responsibilities
- a section is reusable
- client behavior can be isolated

Do not split components purely to reduce line count.

## Data

Static educational content should come from MDX or local static data.

Do not add:

- database
- API
- global store

unless explicitly required.

## State

Prefer in this order:

1. derived values
2. URL state when appropriate
3. local component state
4. shared state only when actually shared

Do not add a state management library without explicit approval.

## Styling

Use Tailwind CSS.

Follow existing UI patterns.

Prefer reusable layout primitives over repeated large class lists when repetition becomes meaningful.

Do not introduce:

- styled-components
- emotion
- CSS-in-JS
- another UI framework

unless requested.

## Code Highlighting

Use the existing Shiki implementation.

Highlight code on the server whenever possible.

Do not initialize a new Shiki highlighter for every rendered code block if an existing reusable highlighter exists.

## Performance

Avoid premature optimization.

Prioritize:

- Server Components
- static rendering
- small client bundles
- minimal hydration

Do not add memoization without a measurable or clear reason.

## Accessibility

Interactive elements must be keyboard accessible.

Use semantic HTML where possible.

Buttons must use `<button>`.

Navigation must use appropriate links.

Images need meaningful alt text unless decorative.

## Changes

Only modify files necessary for the task.

Do not:

- refactor unrelated features
- reorganize directories
- rename unrelated exports
- reformat unrelated files

Stop once the requested behavior is implemented and validated.
