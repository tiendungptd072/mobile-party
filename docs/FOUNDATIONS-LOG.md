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

## F05 — Pilot authoring and editorial review — 2026-10-15

Changed:

- Authored A03, `process-death-and-state-restoration`, in English and Vietnamese. Both bodies have eight H2 sections and four framework H3 sections, in React Native, Flutter, Jetpack Compose, SwiftUI order. The `D42` report scenario explains memory ownership, storage choices, captured checkpoints, revision loss, reconstruction, current-account checks, missing data, offline/conflict policies, and unknown submission outcomes. Process death, configuration change, force-stop/task dismissal, scene transitions, and component unmount remain distinct.
- Added two self-authored technical figures, each with EN/VI SVG labels, localized alternative text/captions, contextual mechanism citations, and adjacent prose equivalents. The ownership diagram routes potential reconstruction inputs into a new UI and never connects lost memory to surviving stores. The sequence separates OS, App, and Data, makes missing-input/access/data branches explicit, and labels its callback order as conceptual application policy.
- Registered explicit local MDX imports, localized metadata, three existing related concepts, thirteen reviewed primary references, and actual EN/VI review dates. The pilot remains `draft`: F07 publishes it after F06 reporting. A temporary `published` status enabled production reader review, then was restored. No navigation/search/sitemap integration, backend, dependency, snippet file, or verification project was added.
- Added a Bun test-preload MDX loader using the existing MDX compiler, Remark transform, and GFM plugin. The formerly empty registry now imports actual MDX, so tests need the same content transforms as Next rather than mocked article bodies. Two real-pilot integration cases validate publication readiness in an isolated published projection and render both locales while asserting that the real public collection still excludes the draft.
- Real pilot review exposed narrow, prose-heavy table columns on mobile. Added one existing Tailwind size utility to the reader's table typography so tables retain readable columns inside their existing labeled horizontal scroll regions. Updated the shared guide/blueprint with this correction, checkpoint versus live-memory distinctions, source-specific debugging scope, application-policy boundaries, and honest version metadata.
- Marked F05 and A03 complete once. F06/F07 and the other 47 articles remain unchecked; A03 does not need another Wave 1 authoring task.

Source review (all cited entries checked on 2026-10-15):

| Article source ID              | Primary source and reviewed scope                                                                                                                                                                                                                        | Applicability boundary                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `android-process-lifecycle`    | [Processes and app lifecycle](https://developer.android.com/guide/components/activities/process-lifecycle): cached process termination and absent `onDestroy()` guarantee.                                                                               | Android process lifecycle; no numeric SDK pin asserted.                                                                                               |
| `android-state-saving`         | [Save UI states](https://developer.android.com/topic/libraries/architecture/saving-states): dismissal versus recreation, ViewModel/saved-state/persistent-storage lifetimes, system-retained state outside the process.                                  | Android Activity/task contracts; current guide includes newer APIs, while the pilot explicitly scopes its examples to established Bundle-based paths. |
| `android-saved-state-handle`   | [Saved State module for ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate): task lifetime, force-stop/task removal, and stopped-Activity capture caveat.                                              | AndroidX `SavedStateHandle`; no library version or newest-value guarantee asserted.                                                                   |
| `android-compose-state-saving` | [Save UI state in Compose](https://developer.android.com/develop/ui/compose/state-saving): UI/model owners, `rememberSaveable`, small payloads, Bundle constraints, and deriving screen state again from data.                                           | Compose/AndroidX APIs; no version-specific experimental API or new executable code.                                                                   |
| `ios-lifecycle`                | [Managing your app’s life cycle](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle): separate scene states and disconnection.                                                                                               | Scene-based UIKit lifecycle on iOS 13+.                                                                                                               |
| `ios-termination`              | [applicationWillTerminate(_:)](<https://developer.apple.com/documentation/uikit/uiapplicationdelegate/applicationwillterminate(_:)>): callback delivery caveats for background-capable apps.                                                             | UIKit delegate callback; no universal final-save opportunity inferred.                                                                                |
| `ios-ui-restoration`           | [Preserving your app’s UI across launches](https://developer.apple.com/documentation/uikit/preserving-your-app-s-ui-across-launches): opt-in controller restoration, encrypted disk archive, application-data separation, discretionary archive removal. | UIKit controller archives, distinct from SwiftUI `SceneStorage`.                                                                                      |
| `ios-restoration-sample`       | [Restoring your app’s state](https://developer.apple.com/documentation/uikit/restoring-your-app-s-state): force-quit/archive deletion and launch-crash caveats in the sample's debugging procedure.                                                      | The article retains that debugging/sample scope rather than asserting universal force-quit behavior.                                                  |
| `react-state-identity`         | [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state): state tied to component identity/tree position and removal.                                                                                                    | React 19.3 documentation; the article applies React ownership rules in React Native without claiming native OS persistence.                           |
| `react-navigation-persistence` | [State persistence](https://reactnavigation.org/docs/state-persistence/): `initialState`/`onStateChange`, asynchronous readiness, serializability, deep-link precedence in the sample, and escaping bad persisted destinations.                          | Current React Navigation documentation; no package pin or automatic app-data persistence claim.                                                       |
| `flutter-state-restoration`    | [Restore state on Android](https://docs.flutter.dev/platform-integration/android/restore-state-android): scopes, widget/custom properties, and restorable Navigator methods.                                                                             | Page identifies Flutter 3.47; Android guide, not a claim that every route/widget is restored automatically.                                           |
| `flutter-restoration-manager`  | [RestorationManager](https://api.flutter.dev/flutter/services/RestorationManager-class.html): bucket IDs, frame-boundary engine synchronization, small reloadable identifiers, and extra iOS embedding setup.                                            | Current services API reference; no SDK pin inferred from the API site's `0.0.0` footer.                                                               |
| `swiftui-scene-storage`        | [SceneStorage](https://developer.apple.com/documentation/swiftui/scenestorage): per-scene isolation, opaque backing data, unspecified persistence timing, explicit scene destruction, and sensitive-data restriction.                                    | Apple availability data identifies iOS/iPadOS 14+; no database durability or unconditional latest-character recovery claim.                           |

Apple's browser-readable documentation initially returned JavaScript shells. Read the actual official DocC JSON content for UIKit lifecycle, termination, preservation, the sample, and SceneStorage after approved network access; the SceneStorage availability metadata was inspected too. Extra State/restoration-process documentation was background research, not another cited source or an assertion about version-sensitive Swift syntax. No verification date was assigned based only on a shell or inaccessible response. Reference titles retain publisher wording; public version fields contain only verified version identifiers, while applicability/unpinned boundaries are recorded here.

Automated verification:

- `bun lint` and `bun typecheck`: passed after final content/reader/test changes. Next's final build also passed TypeScript checking.
- Both new real-pilot readiness/rendering cases passed. Full `bun test`: 175 passed, one failed, 3,685 assertions across 11 files. The sole failure remains the unchanged Windows absolute-path assertion previously reproduced from HEAD during F04: macOS reports `snippet file is missing` for `C:\\outside.kt` rather than the expected `must stay inside`. No new failure was introduced or hidden.
- `xmllint --noout` passed for all four SVG assets. Real publication validation resolves all thirteen source IDs, both locale bodies, matching source/figure sets, all assets, and the three related concept slugs. The pilot contains no executable or pseudocode block and no file-backed snippet reference; no native compiler/device result is claimed.
- Temporary production preview with `bun run build --webpack`: passed, generating 694 static pages including the actual EN/VI article routes. Used the already installed Node 22.22.1. Browser review drove the mobile table correction and an ownership-arrow correction; updated assets were rechecked before completing the review.
- Restored `draft`, then final `bun run build --webpack`: passed with 692 static pages and no pilot article path in the prerender manifest. Final production HTTP checks: both localized indexes return 200 with localized empty states and no draft links; both pilot URLs return 404; the sitemap excludes the pilot. The local check server stopped afterward.
- `bun run content:status --strict`: 864 required concept/stage cells, 864 ready, zero missing. This preserves existing reporting and is not the Foundations report reserved for F06. Final client JavaScript inspection found no pilot slug, MDX compiler package, or highlighter initialization.
- Prettier and final diff/whitespace review cover changed supported files; SVG syntax is checked separately rather than installing a formatter. The existing Content Guide ignore rule is retained. No commit, push, deployment, or native snippet verification is part of this authoring task.

Manual/editorial review:

- Compared EN/VI section intents, source placement, scenario IDs/revisions, capture conditions, failure branches, storage costs, and all four framework approaches. Source/figure/heading-structure checks supplement this review; they do not prove translation or technical truth. Both locale `reviewedAt` dates record author-side technical/editorial review, not an independent human review.
- Checked claims against the source scopes above. Android task saved state is not iOS scene storage; UIKit archives are not durable domain records; source-specific sample testing caveats retain their scope. Authentication readiness, account isolation, draft authority, retries, and conflict behavior are explicitly proposed application policies. No callback-order or last-edit guarantee is smuggled into the diagrams.
- Reviewed the real reader with Chrome 155 headless in all eight EN/VI × light/dark × 390/1440px combinations. Checked loaded localized diagrams, one H1, thirteen source anchors, resolved TOC/citation fragments, canonical/language alternates, and no document overflow/browser runtime exceptions. Visually inspected representative headers, both diagrams, and the real table at mobile/desktop sizes in both themes/locales; SVG label bounds fit all four viewBoxes.
- Activated TOC/citation links with Enter and confirmed visible focus. The actual pilot table scrolls horizontally with ArrowRight; its wider content stays inside the table region. VI-to-EN switching preserves the article slug and clears the locale fragment. All six locale comparison URLs for the three related concepts return 200.
- Four SVGs are repository-authored; no external image, bitmap generation, diagram engine, or borrowed illustration license is involved. Text alternatives and adjacent explanations convey their essential relationships without relying on color.

Limits and follow-ups: no native process-death/device restoration test, full recovery implementation, or independent human review was performed. Browser evidence establishes reading/interaction behavior, not OS guarantees. Reused the supported Webpack build option because F04 established the environment's Turbopack worker-port blocker; no new dependency, configuration replacement, or repeated failing Turbopack attempt was needed. Source payloads, screenshots, browser results/scripts, and build logs are local artifacts under `/private/tmp/mobile-party-f05-*`, outside the repository. The pilot stays unpublished until F07; F06 remains responsible for comprehensive reporting/link/CI checks.

Next eligible task: F06 — Add Foundations quality reporting and CI checks.

## F06 — Quality reporting and CI checks — 2026-10-15

Changed:

- Extended the existing `bun run content:status` CLI with a separate Foundations registry table and summary. Existing concept/technology/stage rows, translation checks, and strict failure rules remain intact. Foundations reports slug/topic, draft/published state, EN/VI structural readiness, publication input readiness, nonempty-body coverage, and contextual issues. Registry coverage is not the 48-article editorial budget or a publication claim.
- Reused supplied-content validation for citation IDs, missing figure/snippet files, metadata, and related identifiers. Extracted shared publication requirements so the loader still rejects incomplete requested publications while the report can list pending draft inputs. Isolated entry audits receive the enclosing registry's article IDs; the full collection is still checked for duplicate/unknown/self relations. Metadata normalization is preserved, including related identifiers with surrounding whitespace.
- Added offline internal-link checks derived from the site's concept, recipe, roadmap, technology, and locale registries. Wrong-locale paths, unknown destinations, unresolved fragments, missing linked assets, and unsupported protocols produce errors. Links to another registered draft are pending in drafts and errors in published sources; metadata related lists retain their published-only reader filtering.
- Unified generated heading/source/figure anchors with reader-owned targets such as references, related sections, and `main-content`. Percent-encoded fragments resolve correctly and a bare `#` remains valid. Related-article section anchors are audited against the actual published related entries, not simply a nonempty metadata list. Local SVG fragments are checked against literal asset IDs.
- Added `--built` checks for all expected published-article anchors, even without authored self-links, and cross-page fragments using generated `.next/server/app` HTML. Missing rendered evidence is a separate `build` diagnostic; unknown fragments with available HTML are `link` errors. No external HTTP requests or automatic source/review-date updates are performed.
- Shared the existing Bun MDX compilation hook between tests and the CLI through `scripts/mdx-loader.ts`; compiler/Remark/GFM dependencies and production Next configuration are unchanged. Added strict structural reporting before tests and strict built-anchor reporting after the build in the existing site CI job. Native verification jobs are unchanged.
- Updated the content contract, editorial guidance, product status, plan, and this log. Marked F06 complete. A03 remains the only authored article and stays draft; F07 publication/discovery is untouched.

Verification:

- New focused quality suite: 24 passed, zero failed, 75 assertions. Controlled in-memory fixtures cover incomplete versus published locale requirements, missing assets, unresolved citations, unknown/self related links, duplicate slugs, locale figure mismatch, wrong-locale paths (including fragment URLs), invalid destinations/protocols/encoding, conditional reader targets, links to drafts, SVG fragments, and build-evidence handling. Copies are discarded; no invalid fixture is registered publicly.
- The suite renders the actual pilot through the real reader in both locales, extracts the produced DOM IDs, and verifies the expected anchors. Removing a generated heading from that evidence fails the check. Filesystem tests use a dedicated temporary build directory and clean it afterward; encoded code examples and `data-id` attributes are not treated as real targets.
- CLI regression test passes: the actual command retains `Required cells: 864; ready: 864; missing: 0.` and appends the real unpublished pilot report. Full `bun test`: 199 passed, one failed, 3,760 assertions across 12 files. The sole failure is the unchanged macOS/Windows-absolute-path assertion established in F04/F05: `C:\\outside.kt` reports `snippet file is missing` instead of the expected `must stay inside`. No new failure was introduced or hidden.
- `bun lint` and `bun typecheck`: passed after the final source changes. `bun run build --webpack`, using the installed Node 22.22.1, passed with 692 static pages; the final build also passed TypeScript checking. Used the supported Webpack flag for the previously established local Turbopack worker-port restriction; no tooling replacement or new dependency was introduced.
- End-to-end controlled link fixture: temporarily appended a clearly labeled local check link to the real English MDX body. `/en/dictionary/state-restoration#main-content` passed `bun run content:status --strict --built` against actual generated HTML. Changing the fragment to `#f06-missing-anchor` exited 1 with `unknown target fragment` and EN marked invalid. Removed the temporary paragraph, confirmed `git diff --exit-code` for that article, and reran strict/built reporting successfully. No educational body, illustration, reference date, or publication status remains changed.
- An earlier probe of a Compare fragment returned a distinct missing-build-evidence diagnostic. Inspection confirmed that Compare reads query-dependent `searchParams` and has no generated HTML artifact, while the Dictionary/Learn target HTML exists. The offline check does not pretend that an unrendered runtime fragment is valid or that its destination is broken.
- Final `bun run content:status --strict --built`: exit 0; 864 concept/stage cells ready, one registered draft, zero published articles, one structurally ready article, 2/2 nonempty locale bodies, zero errors, zero pending issues. Article routes/discovery remain unpublished as required for F07.
- Prettier and focused diff/whitespace review cover changed supported source, workflow, and documentation files. The existing Content Guide formatter ignore rule is preserved. Temporary CLI output/build/test logs are under `/private/tmp/mobile-party-f06-*`, outside the repository.

Boundaries:

- These checks establish structural consistency and declared readiness inputs, not technical correctness, translation fidelity, source authority, diagram usefulness, or proof that editorial review happened. No new external mobile-source verification or native compilation/device behavior is claimed. Snippet files and verification inputs did not change.
- `--built` requires a fresh generated target page for rendered fragments; runtime-only destinations without HTML artifacts remain an explicit evidence limitation. Base destinations are still checked against route/content registries. External availability is deliberately outside this offline command, so a network outage cannot become an invalid-content diagnosis.
- CI steps are configured and their commands were exercised locally. No remote CI run, successful remote job, commit, push, or deployment is asserted. The full local test suite remains red only because of the pre-existing path test; this task does not relabel it as green.

Next eligible task: F07 — Integrate discovery and publish the pilot in the site build.
