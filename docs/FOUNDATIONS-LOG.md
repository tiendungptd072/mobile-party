# Foundations execution log

This log records completed tasks and their actual evidence for [FOUNDATIONS-PLAN.md](FOUNDATIONS-PLAN.md). Article completion is separate from inventory or infrastructure completion.

## F01 — Inventory and scope decisions — 2026-10-14

Changed:

- Added [FOUNDATIONS-INVENTORY.md](FOUNDATIONS-INVENTORY.md), mapping all 48 article IDs/slugs to observed material and remaining gaps: 33 Expand, 15 New, 0 complete articles suitable for unchanged Reuse.
- Inspected the 72-concept registry, metadata/source records for 53 related concepts, all six recipe definitions, selected displayed snippets, and integration utilities. Recorded 412 candidate snippet files under the referenced roots; enumeration is not a new compile/runtime check.
- Adopted `/[locale]/foundations` and `/[locale]/foundations/[slug]` for English and Vietnamese, with ten topic IDs and explicit boundaries for overlapping articles.
- Recorded all 72 existing concepts as React Native/Jetpack Compose comparisons, with no Flutter/SwiftUI implementation entries. Vietnamese overlay keys exist for 72 concepts and six recipes; they are not long-form article translations.
- Identified incomplete adapter/contracts that cannot be presented as full implementations: route-ID restoration, Kotlin secure storage, notification adapters, pending work queues, and GET-only token-refresh replay.
- Marked F01 complete in the plan. F02 and all article IDs remain unchecked; no route, article, dependency, or UI was introduced.

Verification:

- Local registry audit: 48 distinct planned IDs/slugs, 53 valid concept references, six valid recipe references, and existing snippet roots containing 412 TSX/Kotlin/shell files.
- Catalog validation: all 48 plan IDs/slugs match the inventory exactly; 33 Expand and 15 New classifications; ten topics partition all 48 IDs exactly once; all 53 concept IDs and six recipe IDs resolve.
- Local documentation links: 282 links resolve, including the F01 log anchor. External links were intentionally excluded from this local validation.
- Prettier check passed for all three Foundations documents. Git whitespace review reported no whitespace errors; the no-index comparison with an empty file returns a difference status for these new files. Only the three Foundations documents appear as untracked changes; no tracked application/content file changed.
- Lint, typecheck, application tests, build, and native snippet verification were not run for this documentation-only inventory. Existing verification results were not relabeled as new results.

Source review: existing reference records were inspected locally. External pages, current source applicability, and historic verification dates were not reverified. Authoring tasks must review exact source sections and record new evidence; this task adds no newly verified external technical claim.

Gaps: no existing complete Foundations articles or explanatory diagram collection; all new article bodies and diagrams still need authoring. Flutter/Dart and iOS/SwiftUI coverage require primary-source research. Existing exercise/checklist prose must not become article requirements. No implementation blocker was found for F02.

Next eligible task: F02 — Specify the article contract and editorial guide.

## F02 — Article contract and editorial guide — 2026-10-14

Changed:

- Added the Foundations contract to [content-model.md](content-model.md#foundations-articles-f02-contract): typed registry metadata, ten topic IDs, platform/framework scope, draft/published state, localized metadata, reference IDs, contextual citation resolution, figures, file-backed snippets, heading/TOC rules, canonical links, and paired-locale publication readiness.
- Added [Content Guide section 53](CONTENT-GUIDE.md#53-foundations-articles), explicitly allowing detailed mechanism explanations and requiring primary-source review, useful illustrations, localization parity, and honest verification boundaries. Existing concise comparison guidance remains in place for concepts.
- Added the proposed extension and canonical routes to [PRODUCT.md](PRODUCT.md#foundations-extension-specified-implementation-pending), labeled as pending implementation rather than live behavior.
- Added [FOUNDATIONS-ARTICLE-SPEC.md](FOUNDATIONS-ARTICLE-SPEC.md), the A03 pilot blueprint: draft metadata, both locale paths, shared section intents, proposed source IDs, two planned figures, optional existing snippets, and author review/publication requirements. It includes no completed translation, real review timestamp, newly verified source entry, or article-body import.
- Marked F02 complete. F03 is next; F03-F07 and all article checkboxes remain unchecked. No production types, MDX files, components, diagrams, routes, or dependencies were added.

Verification:

- Prettier check passed for all seven relevant documents: Content Guide, Product, content model, article specification, Foundations plan, inventory, and log.
- Documentation consistency check passed: 308 local links/anchors resolve; the contract's ten topic IDs match the inventory; all 48 article IDs/slugs stay unchecked; only F01/F02 are complete. The Content Guide contains exactly one Foundations scope note and one section 53.
- The blueprint stays draft with no registered verified sources or body imports. The check confirmed that no article collection or production Foundation type was created.
- Focused diff review and `git diff --check` passed. Tracked edits are limited to the three relevant documentation files; existing F01 documents are preserved and the pilot specification is new.
- Lint, typecheck, application tests, build, and native snippet checks are not part of this documentation-only specification run; no unrun result is reported as passed.

Source/technical review boundary: inspected the installed Next.js MDX guide and existing reference/snippet contracts, plus the two existing restoration snippets described in the blueprint. Proposed source IDs are a research plan; external pages were not reverified and no new source verification date was assigned.

Acceptance: the contract and sample specify detailed prose, contextual citations, accessible figures, both locale bodies, and optional explanatory code without paired implementations or exercises. The contract explicitly separates mechanically enforceable structure from manual claim/source/translation/diagram review. Runtime enforcement belongs to subsequent tasks.

Open gaps: MDX extraction/rendering, reader pages, real article content/figures/source review, comprehensive CI reporting, and public discovery remain unimplemented. No blocker was found for F03.

Next eligible task: F03 — Implement the MDX content pipeline.

## F03 — MDX content pipeline — 2026-10-14

Changed:

- Added domain types, an empty server-only article registry, metadata/body validation, and published-only collection/list/lookup/related projections. The schema rejects malformed IDs/enums/dates/URLs, unknown related IDs, duplicate slugs/sources, invalid supplied bodies, missing publication locales/reviews/figures/sources, unused sources, and mismatched figure/snippet sets.
- Added a scoped Remark transform that assigns heading IDs and exports structural body data in one compiler pass. It handles Vietnamese normalization and duplicate/literal-suffix collisions, GFM tables, and static Citation/Figure/Snippet declarations. Unsupported dynamic expressions/imports/exports/JSX, Markdown images, reference-style links, footnotes, and inline figure/snippet blocks fail compilation. Other MDX collections are outside this transform's scope.
- Added server-only article bindings for contextual citations, validated figures, file-backed snippets, fenced-code highlighting, and the existing localized reference list. Added optional reference anchors to the shared list; existing callers retain their behavior. Source technology tags use existing display names.
- Added `loadSnippetPath` using the existing root-containment/read/display-region path; executable snippet files and verification projects are unchanged. Moved locale domain IDs/type to `src/types/locale.ts` and preserved the existing i18n module exports, so domain types do not import a higher layer.
- Declared `@mdx-js/mdx` 3.1.1 directly as a dev dependency for real compiler integration tests; it was already transitively installed. Added `remark-gfm` 4.0.1 as a build/test dependency for article tables. Bun updated the lockfile; no existing package versions were upgraded. Next uses serializable plugin strings, with an absolute local plugin path compatible with the installed Windows loader.
- Added synthetic EN/VI fixtures, review metadata, and an isolated test illustration root. They are not in the article registry or permanent public routes. Added 47 meaningful integration/negative tests using the real MDX compiler, React server renderer, shared Shiki, and existing snippet files.
- Updated the contract, editorial rules, and product status to distinguish implemented pipeline behavior from pending reader/report/discovery work. Marked only F03 complete; F04-F07 and all article tasks remain unchecked.

Verification:

- `bun install --frozen-lockfile`: passed with no changes after dependency installation.
- `bun lint` and `bun typecheck`: passed. Initial lint errors from reserved `module` variable names were corrected. The locale re-export and generated MDX export types pass strict TypeScript.
- `bun test`: 169 passed, 0 failed, 3,481 assertions across 11 files, including the 47 Foundations cases. Focused tests, lint, and typecheck also passed after the source-tag display adjustment.
- `bun run content:status --strict`: 864 required cells, 864 ready, 0 missing; the existing concept/stage pipeline retains its coverage.
- Real Next.js/Turbopack smoke build: a temporary, unregistered fixture route imported the local EN/VI MDX modules through `@next/mdx` and statically rendered both locales. Generated HTML contains matching heading/fragment/source anchors, localized figure alternative text/captions, a table, and server-highlighted Kotlin code without hidden package/region markers. The test illustration was resolved against the isolated fixture root; this was HTML/build verification, not a browser image-loading or native-device test.
- Smoke-build browser audit: checked 19 client JavaScript chunks and the route's client-reference manifest; found no compiler/highlighter processing, Foundation server components, or fixture source/snippet code in those client chunks. Rendered article HTML naturally contains its displayed content.
- Removed the temporary fixture route, then `bun run build` passed with the existing 690 static pages and no fixture route. No real article is published.
- Prettier passed for changed supported source/configuration/documentation files; the existing Content Guide ignore rule and unrelated formatting were preserved. Documentation review checked 321 local links/anchors, ten topic IDs, and all 48 unchecked article tasks; the next task remains F04.
- Focused diff/whitespace review passed. A baseline lockfile comparison confirmed all 577 previously resolved entries are unchanged and 18 entries were added for GFM; Bun normalized its lockfile header. No temporary fixture route remains and no fixture is registered publicly. The final read-only review needed approved permissions because the sandbox blocked its child Git process.

Environment: the first smoke attempt wrote its log inside `.next`, which Next cleans; moving the log to the system temp directory fixed the Windows file lock. The sandbox then blocked Next's TypeScript worker with `spawn EPERM`; rerunning with approved build permissions passed. The initial dependency install also needed approved permissions after Bun's temp-directory AccessDenied. These are resolved environment issues, not outstanding task blockers.

Source review: inspected the installed Next.js 16.3.5 MDX guide, MDX type declarations, and the `@next/mdx` plugin loader. Consulted the official [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx), [MDX extension documentation](https://mdxjs.com/docs/extending-mdx/), and [Remark GFM documentation](https://github.com/remarkjs/remark-gfm) for compiler/plugin/table integration. No new mobile-knowledge claim or article source verification is asserted by synthetic fixture metadata.

Limits and follow-ups: reader routes and browser presentation belong to F04; real prose, illustrations, sources, and translation review to F05. F06 adds comprehensive cross-page/internal-link auditing and coverage/CI reporting. Existing RN/Kotlin compilation was not rerun because executable snippets and verification inputs did not change; shared display-loader regression tests and stage coverage passed. No native runtime behavior is claimed from these checks.

Next eligible task: F04 — Implement static article pages.

## F04 — Static index and reader — 2026-10-15

Changed:

- Added `/[locale]/foundations` and `/[locale]/foundations/[slug]` using the existing server collection and localized metadata helper. The index groups published articles by topic and editorial order, hides empty topics, and provides an EN/VI empty state. The reader generates static parameters only for published entries; `dynamicParams = false` rejects unlisted slugs.
- Added server-rendered index/reader presentation: breadcrumbs, localized topic/title/summary, H2/H3 navigation from compiled headings, MDX, figures/captions, contextual citations, references, and related published articles/localized comparisons. Empty related sections are omitted. Existing locale switching already preserves arbitrary route slugs and drops fragments; no selector rewrite was needed.
- Reused the existing Callout for Markdown blockquotes. Added a labeled, keyboard-focusable table scroll region and scoped article typography using existing theme tokens. Figure/code presentation is isolated from prose styles; heading, figure, and source targets have scroll offsets. No client boundary, dependency, educational article, navigation entry, search index, or sitemap entry was added.
- Added five reader/route integration cases alongside the existing compiled EN/VI fixtures. Their synthetic blockquotes exercise localized callouts. Updated the editorial guide, product implementation status, and content contract; marked F04 complete while F05-F07 and every article remain unchecked.

Automated verification:

- `bun install --frozen-lockfile`: passed after approved installation; package manifests and lockfile are unchanged. Used the already installed Node 22.22.1 for Next.js because the default shell Node is 18.20.8.
- `bun lint` and `bun typecheck`: passed. The final Next.js build also passed TypeScript checking.
- Focused Foundations suite: 51 passed, one pre-existing failure. Full `bun test`: 173 passed, one failed, 3,541 assertions across 11 files. All five new reader cases passed, covering EN/VI rendering, unique/resolved anchors, localized notes/table labels, related links, topic ordering/empty states, index canonical/alternate metadata, fixture exclusion, and invalid locale/slug behavior.
- Confirmed the failing Windows-path test exists unchanged in HEAD and reproduced it from a temporary copy of that original test, then removed the copy. On macOS, `loadSnippetPath("C:\\outside.kt", "kotlin")` reports `snippet file is missing` instead of the expected `must stay inside`. The loader and original assertion were left unchanged; this is not a passing suite claim or a new F04 regression.
- `bun run content:status --strict`: 864 required cells, 864 ready, zero missing. Existing concept/stage coverage is unchanged; this is not Foundations quality reporting, which belongs to F06.
- Production smoke build with `bun run build --webpack`: passed, generating 696 static pages with temporary published primary/related EN/VI fixtures and an unpublished draft in the real registry. The first Webpack smoke attempt correctly rejected the related fixture's borrowed illustration path; giving that temporary fixture its own asset resolved the validation error.
- Removed all temporary registry entries/public assets and restored the exact original empty registry. Final `bun run build --webpack`: passed, generating 692 static pages, including both localized empty indexes and no fixture article routes. No build configuration change was required. Client JavaScript inspection of the smoke build found no displayed fixture snippet/source strings, MDX compiler, or highlighter initialization.
- Prettier checks passed for changed supported files, and final diff/whitespace review passed. The existing Content Guide formatter ignore rule was preserved. No commit, push, or deployment was performed.

Browser and manual review:

- Used Chrome 155 headless against the production smoke build, through local DevTools, for all eight combinations of EN/VI, light/dark, and 390/1440px viewport width. Checked one H1, canonical and language-alternate links, resolved local fragments, loaded SVG assets/alternative text, correct locale, and no document overflow or browser runtime exceptions.
- Visually inspected representative full-page desktop EN light/dark and mobile VI light/dark screenshots, plus the VI topic index. The fixture diagram, captions, code, callouts, references, and related sections were readable. This validates reader presentation using synthetic content, not the technical accuracy or accessibility of future pilot diagrams.
- Activated TOC/citation links with Enter, confirmed visible keyboard focus, and verified horizontal keyboard scrolling with ArrowRight after widening a table in the browser DOM. The widened table did not cause document overflow. Switched VI to EN through the existing selector: article slug retained, fragment cleared.
- Confirmed draft and unknown article requests return HTTP 404 in both locales and an unsupported locale returns 404. Next.js logged `Internal: NoFallbackError` for the unlisted article requests while returning the expected 404 responses; no browser runtime error occurred.
- Temporary screenshots, review script/results, and build logs are local artifacts under `/private/tmp/mobile-party-f04-*`, outside the repository. The temporary production server and dedicated headless Chrome were stopped after review.

Environment and limits:

- Default Turbopack builds failed because loader workers could not bind a port (`Operation not permitted`), including the approved retry. Used Next.js's supported `--webpack` build option for production/rendering verification. This remains an environment limitation; no tooling replacement or permission bypass was introduced.
- Read the installed Next.js MDX, `generateStaticParams`, `dynamicParams`, and metadata guides before implementation. No new mobile technical claims, source verification dates, native compilation, or device restoration behavior are asserted by F04. Snippet files/verification inputs are unchanged.
- The real registry remains empty. F05 must author and review A03 in both locales and check its real diagrams/prose in this reader. Comprehensive link/report/CI work and public discovery remain F06/F07.

Next eligible task: F05 — Author and review the pilot article.
