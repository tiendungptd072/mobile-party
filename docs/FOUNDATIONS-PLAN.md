# Mobile Foundations: implementation and editorial plan

Status: in progress; F01-F04 are complete. Created: 2026-10-14. Next task: F05.

Inventory and scope decisions: [FOUNDATIONS-INVENTORY.md](FOUNDATIONS-INVENTORY.md). Execution evidence: [FOUNDATIONS-LOG.md](FOUNDATIONS-LOG.md).

## Purpose and scope

Add a knowledge library explaining how mobile applications work, from operating-system behavior to production delivery. Articles must explain mechanisms, constraints, failure cases, and tradeoffs, supported by diagrams and primary sources.

The audience already understands programming. The library is reference material, not a course requiring exercises, quizzes, challenges, assignments, or completion tracking. Examples illustrate mechanisms; explanatory case studies are allowed.

General principles come first, followed by Android/iOS differences and relevant framework approaches in the canonical order: React Native, Flutter, Jetpack Compose, SwiftUI. Do not require four code implementations when a topic does not warrant them. Clearly distinguish an operating-system API from a language or UI-framework feature.

This is a separate workstream from `docs/PLAN.md`, whose scope is framework porting. Its three snippet stages, exercises, reference app, and task gates are not acceptance requirements for Foundations. Existing modules remain available. No backend, CMS, account, or external search service is required.

## Repository baseline

Verified from repository files on 2026-10-14:

- Concepts are structured TypeScript metadata backed by snippet files. The existing concept validator requires at least two implementations; that contract does not fit platform-neutral articles.
- The concept registry contains 72 concepts, including lifecycle, state restoration, permissions, authentication, offline-first data, background work, and testing. Presence does not establish sufficient article depth or four-framework coverage.
- `@next/mdx` is installed and configured in `next.config.ts`; `mdx-components.tsx` exists, but there is no current MDX article collection. Configuration alone does not prove the new publishing path works.
- Existing source contracts include reference title, URL, kind, verification date, and optional technology/version. A server-rendered reference list and shared Shiki highlighting already exist.
- Public pages use English/Vietnamese locale routes and a generated sitemap. The current search index contains concepts only.
- Some documentation describes earlier architecture. Audit actual code before depending on incomplete tasks or historical status in the older plan.

## Proposed reader experience

Routes:

```text
/en/foundations
/vi/foundations
/en/foundations/[slug]
/vi/foundations/[slug]
```

The index groups published articles by topic and shows localized titles and summaries. Article pages provide breadcrumbs, a table of contents, the article body, contextual source citations, a reference list, related articles, and links to existing comparisons where useful. Readers can switch locales while retaining the article slug.

Use existing typography, tokens, navigation, callouts, and code components. Tables and diagrams must work on mobile and in both themes. Avoid adding a separate design system or a framework-pair selection requirement for general articles.

## Article standard

Each article must cover the following where relevant, with descriptive headings rather than a repeated rigid template:

1. Definition, scope, terminology, and the practical problem.
2. The mechanism, step by step: ownership, execution context, data location, and lifetime.
3. At least one meaningful diagram or technical illustration, accompanied by an explanation and accessible text equivalent.
4. A concrete scenario or minimal code example explaining the mechanism.
5. Android/iOS differences and relevant framework approaches, with explicit limitations of analogies.
6. Failure cases, guarantees, implementation-dependent behavior, and recovery.
7. Alternatives, selection criteria, costs, and tradeoffs.
8. Common misconceptions with explanations of why they are wrong.
9. Citations near the technical claims they support and a complete reference list.

Do not set an artificial word count. Split an article when it contains several independent mechanisms. Explain enough for a reader to understand why behavior occurs, rather than listing API names. Avoid promises that the library covers every mobile specialization.

### Sources and evidence

- Prefer official platform/framework documentation, specifications, language proposals, and official samples. Use OWASP sources for applicable security guidance.
- Verify the linked section and the claim before publishing. Record the actual verification date, applicable API/OS/library version, and platform scope. Do not treat the verification date as the source's publication date.
- Use stable source IDs for inline citations and the reference list. Reuse the existing reference contract where it fits; extract a shared type only if both consumers need it.
- Distinguish documented guarantees, simplified explanatory models, and author recommendations. Omit unresolved claims or keep them in unpublished drafts.
- A list of links at the bottom does not replace citations beside claims. Respect quotation limits and licensing.

### Diagrams and images

- Prefer state diagrams for lifecycle, sequence diagrams for asynchronous flows, architecture diagrams for boundaries, and timelines for races or scheduling.
- Start with repository-owned static SVGs, rendered without a browser diagram engine. Keep editable source alongside exported assets when using a diagram tool.
- Add a heavier generation dependency only after the pilot demonstrates a need. Do not introduce interactive diagrams by default.
- Identify conceptual simplifications. Add captions, descriptive alternative text, and a prose explanation of essential relationships.
- Localize meaningful labels; preserve API names. A shared English technical diagram requires a clear explanation in both locales.
- Attribute external images and verify reuse rights. Self-authored diagrams should cite the sources of their technical mechanisms.

### Code examples

- Reuse existing snippet files by reference where the same example is appropriate. Keep a single source for displayed code.
- Use the shared server-side Shiki configuration. Do not ship Shiki or native verification tooling to the browser.
- Typecheck/compile new or changed executable React Native/Kotlin examples through the existing verification projects. Account for article-specific paths if needed.
- Explicitly identify pseudocode and omitted setup. Never describe Dart/Swift examples as compiler-verified until corresponding checks actually exist; record documentation review separately.
- Avoid adding full application scaffolding for an explanatory fragment.

## Proposed implementation boundaries

Confirm exact shapes during F02 rather than generating all directories in advance:

```text
content/foundations/
  index.ts                         # explicit typed registry, metadata, locale MDX imports
  en/<slug>.mdx                    # English technical source
  vi/<slug>.mdx                    # complete localized article body
public/illustrations/foundations/<slug>/
  <diagram>.svg
src/types/foundation.ts
src/lib/content/foundations.ts
src/components/foundations/
app/[locale]/foundations/
  page.tsx
  [slug]/page.tsx
```

Use an explicit MDX import registry compatible with the installed Next.js compiler. Keep long prose in MDX and localized metadata in the typed registry. Do not add a frontmatter parser or remote MDX execution unless a demonstrated need emerges.

Article metadata should represent stable slug, topic, order, localized title/summary, keywords, platform scope, source references, related article/concept slugs, and editorial review information. Derive navigation and search from that metadata. Do not repeat lists in UI components.

English and Vietnamese MDX bodies share technical scope, examples, source IDs, and meaningful diagram content. Publish an article only when both locales are ready. Drafts do not produce public links, search entries, or sitemap entries. Do not publish English fallback as completed Vietnamese content.

The loader is server-only. Routes are statically generated with locale metadata and language alternates. Table-of-contents anchors must match rendered headings, including Vietnamese text and duplicate headings. Avoid a second heading list that authors must manually synchronize with prose.

## Implementation tasks

Task checkboxes record verified completion. Execute one task per run, respect dependencies, preserve user changes, and record actual evidence before checking it. No commits, pushes, or deployments are implied by this document; follow the authorization active in the session.

### F01 [x] Inventory existing content and agree on boundaries

Dependencies: none.

Inspect the relevant existing concepts/recipes and classify each planned article as reuse, expand, or new. Record reusable snippets, sources, and coverage gaps. Confirm the article route and topic taxonomy. Limit documentation corrections to the new feature's scope.

Acceptance: a mapping exists for every catalog entry below; gaps are distinguished from verified existing coverage; no existing exercises are imported into the new article model.

Evidence (2026-10-14): [inventory](FOUNDATIONS-INVENTORY.md) maps all 48 articles to 33 Expand and 15 New entries; records 53 related concepts, 6 recipes, 412 candidate snippet files, existing source records, and their limitations; adopts the locale routes and ten topics. No existing article qualifies for unchanged reuse. See [F01 log](FOUNDATIONS-LOG.md#f01--inventory-and-scope-decisions--2026-10-14) for checks and remaining work.

### F02 [x] Specify the article contract and editorial guide

Dependencies: F01.

Define metadata, source/citation IDs, locale publication rules, related links, heading anchors, and illustration conventions. Add a Foundations-specific section to `docs/CONTENT-GUIDE.md` so its concise comparison rules do not constrain detailed articles. Document the new model and product routes.

Acceptance: a sample article specification supports long prose, inline citations, accessible diagrams, and both locales without requiring paired implementations or exercises. Editorial requirements and mechanically enforceable checks are distinguished.

Evidence (2026-10-14): [article contract](content-model.md#foundations-articles-f02-contract) defines metadata, source/figure/snippet IDs, heading anchors, related links, paired-locale publication, and draft exclusion. [Editorial rules](CONTENT-GUIDE.md#53-foundations-articles), [product scope](PRODUCT.md#foundations-extension-specified-implementation-pending), and the [A03 blueprint](FOUNDATIONS-ARTICLE-SPEC.md) distinguish structural checks from source/translation/diagram review. The blueprint is not a published article or a claim of new source verification; F03-F07 implementation and A03/F05 authoring remain unchecked. See [F02 log](FOUNDATIONS-LOG.md#f02--article-contract-and-editorial-guide--2026-10-14).

### F03 [x] Implement the MDX content pipeline

Dependencies: F02.

Add the typed registry, server-only loader, and MDX component mappings. Resolve references and snippet code through existing utilities. Validate slugs, metadata, locale availability, source IDs, and canonical related links. Read the installed Next.js MDX/static-generation documentation before coding.

Acceptance: fixture articles render from local MDX in both locales; invalid references or duplicate slugs fail validation; draft filtering works; no MDX/Shiki content processing is added to the browser bundle. Fixtures are not public production articles.

Evidence (2026-10-14): the [server pipeline](../src/lib/content/foundations.ts), [schema](../src/lib/content/foundation-schema.ts), [MDX transform](../scripts/remark-foundations.mjs), and [server bindings](../src/components/foundations/foundation-body.tsx) are implemented. Real local MDX fixtures render EN/VI with generated headings, tables, source anchors, figures, and shared Shiki snippets. Negative tests cover duplicate slugs, unresolved sources, invalid metadata, missing locale/asset/snippet inputs, traversal, and publication parity; drafts are hidden from lists, lookup, and related discovery. A temporary Next.js smoke route built both locale fixtures and was removed; client chunk inspection found no MDX/Shiki processing. The normal build still generates 690 pages. The real registry is empty and all article checkboxes remain unchecked. See [F03 log](FOUNDATIONS-LOG.md#f03--mdx-content-pipeline--2026-10-14).

### F04 [x] Implement static article pages

Dependencies: F03.

Build the index and reader with existing UI patterns. Add breadcrumbs, generated table of contents, code, callouts, figures, citations, references, and related links. Set localized metadata, canonical URLs, language alternates, and not-found behavior.

Acceptance: desktop/mobile and light/dark views are readable; anchors and keyboard links work; diagrams have accessible explanations; both locales render correctly; pages are statically generated. Review representative browser views.

Evidence (2026-10-15): the [index](../app/[locale]/foundations/page.tsx) and [reader](../app/[locale]/foundations/[slug]/page.tsx) render localized topic groups, breadcrumbs, generated TOC, server MDX/Shiki content, callouts, scrollable tables, figures, citations, references, related links, canonical URLs, and language alternates. A temporary registry exercised both real routes with published EN/VI MDX fixtures and a hidden draft; Chrome checked eight locale/theme/viewport combinations, keyboard anchors/table scrolling, locale switching, and 404 responses. Fixtures and public test assets were then removed; the final Webpack build generates 692 static pages with an empty real registry. Lint/typecheck pass; tests report 173 passed and one independently reproduced pre-existing Windows-path assertion failure on macOS. Turbopack's worker port remains blocked by the environment; the supported Webpack build passes without configuration changes. See [F04 log](FOUNDATIONS-LOG.md#f04--static-index-and-reader--2026-10-15).

### F05 [ ] Author and review the pilot article

Dependencies: F04.

Write A03, `process-death-and-state-restoration`, in English and Vietnamese. Include a state-ownership/storage comparison, a process-recreation sequence, failure cases, contextual citations, and links to relevant existing concepts. Explicitly distinguish process death, configuration change, force-stop, and unmount.

Acceptance: the full article standard passes; sources were actually checked; diagram labels and prose agree; the article works in the reader. Record editorial corrections to the shared template before scaling. This completes A03 once; do not author it again in Wave 1.

### F06 [ ] Add Foundations quality reporting and CI checks

Dependencies: F05.

Extend the existing content-report approach with article coverage, locale readiness, missing assets, unresolved citations, invalid related links, and publication status. Preserve existing concept/stage reporting. Check internal anchors and local asset references with the smallest suitable build/test integration.

Acceptance: controlled invalid fixtures fail the relevant checks, then are removed/restored; valid articles pass. Do not describe automated checks as proof of technical truth or translation quality. External link availability may be checked separately; network outages must be distinguishable from invalid content.

### F07 [ ] Integrate discovery and publish the pilot in the site build

Dependencies: F05 and F06.

Add the Foundations navigation entry, sitemap URLs, topic index, and a small localized article search using metadata. Reuse existing search utilities where appropriate without turning the concept dictionary into an unrelated universal search rewrite. Add contextual links from selected existing content.

Acceptance: readers find A03 from navigation and search in both locales; locale switching preserves the article; sitemap/canonical URLs agree; drafts are absent. Existing Learn/Compare/Dictionary/Recipes behavior still passes relevant checks. No deployment is required by this task.

## Article catalog and writing waves

Initial target: 48 articles, each with English and Vietnamese bodies. This is an editorial budget of 96 localized bodies, not a completion claim. F01 may split or combine entries based on actual depth; update IDs and dependencies explicitly when changing scope.

Every article is one authoring task covering both locales, sources, illustrations, integration, and review. F07 unlocks the writing waves. Waves establish order, not a requirement to write an entire wave in one run. Read linked prerequisite explanations when needed; do not publish broken related-article links to drafts.

### Wave 1: runtime, lifecycle, state, and rendering

| ID      | Article slug                          | Core coverage                                                                             |
| ------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| A01 [ ] | `mobile-runtime-and-sandbox`          | OS/process/thread roles, app runtime, sandbox, resource ownership                         |
| A02 [ ] | `application-and-screen-lifecycle`    | Process, Activity/scene, screen and component lifetimes; foreground/background/suspension |
| A03 [ ] | `process-death-and-state-restoration` | State loss, configuration change, saved state versus durable storage; pilot F05           |
| A04 [ ] | `startup-and-session-restoration`     | Cold/warm start, initialization dependencies, session/draft recovery and reconciliation   |
| A05 [ ] | `state-ownership-and-data-flow`       | UI/server/navigation/persistent state, derived state, UDF, state machines and effects     |
| A06 [ ] | `rendering-and-frame-scheduling`      | Render/layout/mount, invalidation, frame deadlines, framework-specific models             |
| A07 [ ] | `input-gestures-focus-and-keyboard`   | Event delivery, hit testing, gesture conflicts, focus, IME and keyboard interaction       |
| A08 [ ] | `memory-and-resource-lifetimes`       | GC, ARC, ownership, retain cycles, listeners and native resources                         |
| A09 [ ] | `time-money-and-data-representation`  | Wall/monotonic clocks, timestamps, timezone/DST, decimal precision, Unicode               |

### Wave 2: concurrency, networking, and persistence

| ID      | Article slug                           | Core coverage                                                                             |
| ------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| A10 [ ] | `concurrency-and-execution-contexts`   | Event loops, suspension/blocking, CPU/I/O, threads, executors and isolates                |
| A11 [ ] | `task-ownership-and-cancellation`      | Structured concurrency, lifecycle scopes, cooperative cancellation and side-effect limits |
| A12 [ ] | `races-and-request-coordination`       | Stale responses, debounce/throttle, deduplication and bounded concurrency                 |
| A13 [ ] | `streams-and-backpressure`             | Cold/hot streams, replay, buffering, conflation and lifecycle-aware observation           |
| A14 [ ] | `shared-state-and-actor-isolation`     | Data races, synchronization, actor reentrancy and state across suspension points          |
| A15 [ ] | `http-and-api-contracts`               | HTTP semantics, transport versus HTTP errors, serialization, validation and compatibility |
| A16 [ ] | `timeouts-retries-and-idempotency`     | Unknown outcomes, backoff/jitter, retry budgets, duplicate writes and recovery            |
| A17 [ ] | `pagination-and-cache-consistency`     | Cursor/offset pagination, invalidation, cache validation and optimistic updates           |
| A18 [ ] | `reliable-file-transfers`              | Upload/download lifetimes, resumability, progress, checkpoints and integrity              |
| A19 [ ] | `realtime-connections-and-recovery`    | WebSocket/stream lifetimes, reconnect, ordering and resynchronization                     |
| A20 [ ] | `choosing-local-storage`               | Key-value, files, databases, caches and secure storage; selection tradeoffs               |
| A21 [ ] | `database-transactions-and-migrations` | Atomicity, indexing, schema evolution, corruption and migration failure                   |
| A22 [ ] | `offline-data-and-synchronization`     | Local source of truth, outbox, conflicts, optimistic writes and reconciliation            |
| A23 [ ] | `data-lifecycle-backup-and-accounts`   | Account isolation, retention, deletion, backup/restore, reinstall and device transfer     |

### Wave 3: architecture, platform integration, and security

| ID      | Article slug                                        | Core coverage                                                                                |
| ------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| A24 [ ] | `architecture-and-responsibility-boundaries`        | UI/data/domain, MVVM/MVI/Clean distinctions, DTO/domain/UI models and complexity costs       |
| A25 [ ] | `dependency-injection-and-modularity`               | Composition, DI lifetimes, feature boundaries and dependency direction                       |
| A26 [ ] | `navigation-state-and-back-behavior`                | Stacks/tabs/modals, nested navigation, typed parameters and platform back behavior           |
| A27 [ ] | `deep-links-and-external-entry-points`              | Custom schemes, Universal/App Links, verification, routing and untrusted inputs              |
| A28 [ ] | `authenticated-navigation-and-pending-destinations` | Cold/warm entry, auth readiness, duplicate handling, logout and authorization                |
| A29 [ ] | `permissions-and-capability-availability`           | Contextual requests, denial/revocation/limited access and feature degradation                |
| A30 [ ] | `files-pickers-and-media-boundaries`                | Sandbox directories, URI grants, temporary files, formats, EXIF and picker lifetimes         |
| A31 [ ] | `background-execution-and-scheduling`               | OS limits, task selection, constraints, expiration, interruptions and durable work           |
| A32 [ ] | `notifications-and-push-delivery`                   | Local/remote/silent notifications, token lifecycle, taps, delivery limits and reconciliation |
| A33 [ ] | `authentication-and-session-security`               | Auth versus authorization, OAuth/OIDC/PKCE, token refresh coordination and logout            |
| A34 [ ] | `secure-storage-and-key-management`                 | Keychain/Keystore roles, credentials, biometrics, key lifecycle and threat boundaries        |
| A35 [ ] | `privacy-and-mobile-attack-surfaces`                | Data minimization, logs/analytics/clipboard, external inputs, consent and third-party SDKs   |
| A36 [ ] | `webviews-and-browser-boundaries`                   | Cookies/session, navigation policies, JS messaging, untrusted content and downloads          |
| A37 [ ] | `native-interop-and-runtime-boundaries`             | Modules/channels, serialization, threading, error propagation and native ownership           |

### Wave 4: quality, delivery, and system behavior

| ID      | Article slug                                 | Core coverage                                                                                     |
| ------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| A38 [ ] | `adaptive-ui-and-accessibility`              | Insets, windows/foldables, semantics, screen readers, text scaling and reduced motion             |
| A39 [ ] | `localization-and-international-ui`          | Translation structure, plurals, RTL, locale formatting and layout expansion                       |
| A40 [ ] | `measuring-startup-and-ui-performance`       | Release measurements, startup, jank, render costs, large lists and budgets                        |
| A41 [ ] | `image-memory-network-and-energy-costs`      | Image decoding/caching, memory pressure, polling, location and battery tradeoffs                  |
| A42 [ ] | `testing-and-debugging-mobile-behavior`      | Test boundaries, controlled async, native/device limits, failure injection and debugging tools    |
| A43 [ ] | `observability-and-incident-diagnosis`       | Crash/ANR/hangs, structured logs, redaction, symbols/source maps and version cohorts              |
| A44 [ ] | `build-environments-signing-and-ci`          | Debug/release, identifiers, configuration, credentials, signing and reproducibility               |
| A45 [ ] | `releases-upgrades-and-operational-recovery` | Beta/rollout, store delivery, old clients, flags, rollback limits and OTA boundaries              |
| A46 [ ] | `platform-and-dependency-compatibility`      | API availability, capability detection, OS/SDK/library versions and upgrade strategy              |
| A47 [ ] | `mobile-system-design-and-consistency`       | Client/server responsibilities, trust, eventual consistency, offline/realtime tradeoffs           |
| A48 [ ] | `a-resilient-mobile-workflow-explained`      | Explanatory case study connecting drafts, upload, process recreation, auth and notification entry |

Testing articles explain how verification works; they do not assign exercises to readers. A48 is a walkthrough of system behavior, not a project to implement.

Specialist tracks are separate backlog items after the core catalog: advanced camera/audio/video, maps/location/geofencing, Bluetooth/NFC, in-app purchases/subscriptions, widgets/extensions, wearables, and automotive. Each needs its own scope and sources; these are not mandatory for every app.

## Acceptance for every published article

- [ ] Mechanisms, terminology, boundaries, guarantees, failure cases, and tradeoffs are explained in depth.
- [ ] English and Vietnamese convey the same technical claims and examples; all public copy is localized.
- [ ] A useful illustration has a caption, accessible text equivalent, accurate labels, and attribution where applicable.
- [ ] Technical claims have contextual primary-source citations; source IDs, dates, versions, and reference links are valid.
- [ ] Code is either verified through the applicable tooling or accurately labeled with its verification limits.
- [ ] Internal links, heading anchors, snippet references, and illustration paths resolve; related unpublished articles are not linked publicly.
- [ ] No exercises, quizzes, assignments, or completion requirements are introduced.
- [ ] The article reads correctly on a narrow screen, in both themes and locales.
- [ ] Applicable automated checks pass; manual source and translation review is recorded separately.

## Verification and reporting

For this planning document: formatting and `git diff --check` only. Writing a plan does not establish implementation acceptance.

For implementation tasks: run relevant unit/content checks first, then `bun lint`, `bun typecheck`, and `bun test`. Use `bun run build` for routing, MDX, metadata, or significant rendering changes; this explicitly invokes the project script rather than Bun's bundler command. Run `bun run verify` when executable snippet content or its integration changes. Add Foundations reporting in F06 before declaring catalog coverage complete.

Use browser review for the reader/pilot and representative changes to article presentation. Do not rerun unrelated native compilation for prose-only changes. CI status is evidence only after the relevant job actually runs.

Record task ID, changed scope, reviewed sources, automated results, manual review, open gaps, and next eligible task in `docs/FOUNDATIONS-LOG.md` when implementation begins. Do not create a log claiming work that has not happened.

Main risks: producing broad but shallow articles; duplicating existing explanations; translating incorrect source claims; diagram/prose disagreement; outdated version assumptions; and growing client bundles for a reading feature. Address these with inventory, a reviewed pilot, paired-locale publishing, static illustrations, and focused checks before scaling authoring.
