# Delivery Roadmap

Each phase must leave the repository lintable, type-safe, and production
buildable. A phase does not begin until the previous phase passes its relevant
checks.

## Phase 0 — Project foundation

Status: complete.

- Next.js App Router, strict TypeScript, Tailwind, ESLint, and Bun scripts
- import alias and maintainable source/content boundaries
- base metadata, fonts, semantic theme tokens, persisted theme selection
- responsive application shell
- project, architecture, content-model, and delivery documentation

Exit checks: `bun lint`, `bun typecheck`, and `bun build`.

## Phase 1 — Design system

Status: complete.

- typography, spacing, containers, buttons, badges, tabs, cards, and callouts
- selectors and reusable responsive layout primitives
- accessible focus, light/dark variants, and documented component states

No business route is required until these primitives are stable.

## Phase 2 — Content engine

Status: complete.

- technology, concept, recipe, and roadmap domain models
- repository content loader and schema validation
- shared server-side Shiki configuration
- sample concepts: component, local state, list, async, and API request
- focused tests for parsing, validation, sorting, and canonical references

## Phase 3 — Home and technology pair

Status: complete.

- Home selection flow and pair validation
- reusable technology selector and switcher
- local pair preference and canonical routing
- React Native to Kotlin start flow

## Phase 4 — Compare

Status: complete.

- comparison index and category navigation
- concept details, relationship badges, mental models, and differences
- responsive `CodeComparison`
- optional technology visibility with source and target selected by default

This is the highest-priority product feature.

## Phase 5 — Learn

Status: complete.

- pair-specific roadmap and sidebar
- complete lesson structure and previous/next navigation
- explicit completion action and local progress persistence
- graceful handling of incomplete technology implementations

## Phase 6 — Dictionary

Status: complete.

- build-time search index and dictionary details
- aliases, API names, categories, technologies, and keywords
- client-side search with Cmd/Ctrl+K and keyboard navigation

## Phase 7 — Recipes

Status: complete.

- recipe index and detail routes
- responsive technology tabs, flow, and architectural differences
- seed recipes for API request, refresh token, pagination, secure storage,
  biometric login, and deep links

## Phase 8 — Quality

Status: complete.

- route metadata, canonical URLs, sitemap, robots, and Open Graph assets
- not-found, loading, and empty states
- accessibility and responsive audits
- performance review and focused unit/E2E coverage for critical flows

## Deferred beyond MVP

AI conversion, chatbot features, backend services, accounts, cloud progress,
comments, community features, CMS, online compilation, emulators, user content,
payments, and subscriptions are explicitly out of scope.

The post-MVP React Native → Android learning program is tracked separately in
[the Android transition plan](android-transition-plan.md).
