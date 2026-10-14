# Plan execution log

## P0.1 — Self-host fonts so build works offline — 2026-10-13 — Codex

Changed: Replaced Google font imports in `app/layout.tsx` with `next/font/local`. Added unmodified Geist and Geist Mono variable WOFF2 files from the official v1.7.2 release under `app/fonts/`, with the original SIL Open Font License and source archive provenance. Preserved the existing CSS variables, weight range 100–900, and swap display behavior. No dependencies changed.

Verification:

- `bun lint`: passed.
- `bun typecheck`: passed.
- `bun test`: 60 passed, 0 failed; no tests changed.
- `bun run build`: passed, generating 690 static pages. A temporary Node preload guard rejected external TCP connections while permitting loopback and IPC. A probe against `fonts.googleapis.com` confirmed the guard rejected external access before building. Telemetry was disabled. The initial sandboxed build compiled successfully but failed to spawn the TypeScript worker (`spawn EPERM`); the successful run used approved execution outside the sandbox with the same network guard.
- `bun build` invokes Bun's bundler in Bun 1.2.18 and fails without entrypoints; `bun run build` is the correct command for the package's Next.js build script.
- Verified the downloaded release archive against GitHub's published SHA-256 digest. Parsed both fonts with Next.js's bundled font parser: both report the expected family and 100–900 weight axis, and contain every glyph in the Vietnamese verification sample.
- Checked generated `/en` and `/vi` HTML: both preload the two local WOFF2 files. Generated CSS retains local font faces, swap display, the weight range, and existing CSS variable integration. Emitted font hashes match the checked-in source files.
- Prettier checks for the layout and font README, and `git diff --check`: passed.

Unverified: Browser visual inspection could not run because Browser initialization failed with `Importing module "node:process" is not allowed in node_repl`. Font parsing and generated HTML/CSS checks passed; no visual screenshot was reviewed.

Gaps found: None in the implementation. The plan's verification command should use `bun run build` to avoid Bun's built-in bundler command.

Open questions: None.

## P0.2 — Fix incorrect examples and ordering — 2026-10-13 — Codex

Changed: Updated `content/concepts/async.ts` and `api-request.ts` to use a configured absolute HTTPS endpoint, encoded user IDs, matching User results, and caller-owned cancellation. Updated relationship explanations and production guidance. Corrected the related Learn examples to return data consistently, propagate AbortSignal, preserve cancellation at error boundaries, and suppress obsolete UI updates. The API recipe now uses an absolute URL and ignores canceled results; its Kotlin CancellationException rethrow was already correct and was preserved. Replaced the refresh-token snippets with one instance per session: concurrent requests share a Promise or synchronized refresh, late 401s reuse the renewed token, refresh failure clears session credentials and notifies sign-out once, and GET retries are bounded to one. Updated the English and Vietnamese guidance together. Changed Text Input's lesson order from 5 to 15 so Local State (10) comes first.

Verification:

- `bun lint` and `bun typecheck`: passed.
- `bun test`: 77 passed, 0 failed. The 17 new cases in `src/lib/content/request-examples.test.ts` execute the published TypeScript snippets with controlled dependencies. They cover endpoint construction, HTTP/transport failure propagation, cancellation forwarding, ignored late results, concurrent and late 401s, failed or invalid refresh credentials, sign-out, and bounded retries. No dependencies or network calls are needed for these tests.
- The existing roadmap-order expectation in `src/lib/content/content.test.ts` changed only to reflect Local State before Text Input. A new test checks that dependency ordering in both locales. Existing localization tests confirm matching structure and unchanged shared code between locales.
- `bun run build`: passed, generating 690 static pages. Used approved execution outside the sandbox because the previous task established that the sandbox blocks build workers with `spawn EPERM`. Verified updated cancellation guidance in generated English and Vietnamese dictionary pages and both refreshed implementations in the generated recipe pages.
- Prettier checks for changed source files and `git diff --check`: passed.

Official API review:

- [React Native networking](https://reactnative.dev/docs/network) and [AbortController](https://reactnative.dev/docs/global-AbortController): absolute request URLs and explicit cancellation.
- [Axios configuration](https://axios.rest/pages/advanced/config-defaults), [cancellation](https://axios.rest/pages/advanced/cancellation), and [error handling](https://axios.rest/pages/advanced/error-handling): configured instances, AbortSignal, and default non-2xx rejection.
- [Retrofit 3.0.0 coroutine adapter source](https://github.com/square/retrofit/blob/3.0.0/retrofit/src/main/java/retrofit2/KotlinExtensions.kt): cancellation cancels the underlying Call; body-returning suspend calls propagate HTTP failures.
- [OkHttp 5.1.0 Authenticator contract](https://github.com/square/okhttp/blob/parent-5.1.0/okhttp/src/commonJvmAndroid/kotlin/okhttp3/Authenticator.kt): synchronous authentication, follow-up requests, null on failure, and bounded retry policy.
- [Android lifecycle coroutine scopes](https://developer.android.com/topic/libraries/architecture/coroutines) and [Kotlin exception handling](https://kotlinlang.org/docs/exception-handling.html): scope ownership and preserving CancellationException.

Unverified: Kotlin snippets were reviewed against official APIs but not compiled or executed. Java is available; `kotlinc` and the planned Android snippet verification project are not. The TypeScript snippet tests transpile and execute controlled examples; they do not replace the complete snippet type-checking/Android compilation planned in P0.5. `docs/VERSIONS.md` does not exist yet; the source tags above are review baselines, not new project version pins.

Gaps found: None beyond the snippet verification work already planned in P0.4–P0.5.

Open questions: None.

## P0.3 — Make the schema truly pair-agnostic — 2026-10-13 — Codex

Changed: Replaced the required React Native/Kotlin pair in `src/lib/content/schema.ts` with a minimum of two supported implementations. The shared implementation validator also accepts other technology pairs in roadmap stage examples. Relationship overrides can be omitted or empty and are normalized to an empty array; declared relationships still require distinct, existing implementations. Added concise contract comments to `src/types/concept.ts` and updated `docs/content-model.md`. No content files, routes, UI copy, dependencies, or existing relationship data changed.

Verification:

- `bun test src/lib/content/content.test.ts`: 48 passed, 0 failed.
- `bun lint` and `bun typecheck`: passed.
- `bun test`: 85 passed, 0 failed, including existing English/Vietnamese content and roadmap coverage checks.
- Updated the old test requiring React Native/Kotlin to assert the new minimum of two implementations. Added eight cases covering a Flutter/SwiftUI-only concept, zero implementations, omitted and empty relationship overrides, a three-technology concept without overrides for every pair, absent source/target implementations, and malformed relationship overrides. Together with the updated single-implementation rejection test, these cover the task's acceptance criteria.
- `bun run build`: passed, generating 690 static pages in both locales. Used approved execution outside the sandbox because earlier tasks established that the sandbox blocks build workers with `spawn EPERM`.
- Prettier checks and `git diff --check` for changed files: passed. `git diff --name-only -- content` was empty, confirming existing content files are unchanged.

Unverified: None. This task changes local schema validation and adds no external framework API claims.

Gaps found: None.

Open questions: None.

## P0.4 — Snippets as real files, loaded at build time — 2026-10-13 — Codex

Changed: Migrated all 588 implementation occurrences across 72 concepts, 6 recipes, and 216 lesson stages into 560 snippet files. Matching Compare/Learn basics share a file; 116 distinct Learn basic examples use explicit `snippet` references to `learn-basic` files. The owner confirmed this expanded scope because the original plan assumed only eight concepts. Preserved displayed code, including existing visible imports. New Kotlin package declarations remain outside the display region; all Kotlin packages are unique. Existing shell examples use full-file `.sh` display.

Added a `server-only` loader using `node:fs`, convention-based and explicit path resolution, display region extraction, missing-file errors with paths, and path containment checks. Concepts, stages, and recipes reject inline `tsx`, `typescript`, and `kotlin` code. Reserved the `recipes` concept slug. Split client-safe technology validation and shared primitive validation from the file-backed schema after the first build exposed the SiteHeader import chain; this preserves technology validation without shipping filesystem code to the client. Next.js handles the `server-only` marker internally, so no dependency was added. Bun's test preload mocks only that marker in server-side tests. Updated root exclusions and snippet authoring documentation.

Verification:

- Captured normalized English and Vietnamese concepts, recipes, and roadmaps before migration. Deep comparison after migration passed for both complete locale models: every code string, stage example, and metadata field is identical.
- Captured rendered code before migration. After the final build, SHA-256 hashes matched for all 3,492 highlighted `<pre>` blocks across 234 generated pages, including English and Vietnamese Learn/Recipes pages.
- `bun lint`, `bun typecheck`, and `bun test`: passed; 107 tests passed, 0 failed. New tests cover display regions, CRLF normalization, full-file display, malformed/empty regions, missing files, path containment, distinct Learn basic resolution, unique Kotlin packages, reserved slugs, inline-code rejection for concepts/stages/recipes, and absence of snippet bodies in both locale search indexes.
- Updated request behavior tests to execute loaded, normalized snippets instead of inline raw content. The arbitrary-pair schema fixture keeps small inline Dart/Swift comments, which are outside the languages prohibited by this task. No educational content claims changed.
- `bunx --no-install tsc --listFilesOnly`: no files under `content/snippets/` or `verify/`. Prettier ignored representative TSX and Kotlin snippet paths as configured; supported changed source/document formats passed Prettier checks. ESLint passed with the new snippet exclusions.
- `bun run build`: passed, generating 690 static pages. The initial build revealed the client/server dependency issue described above. A subsequent Turbopack run failed internally with a canceled source-map task; preserving the old generated cache under `.next/cache/turbopack-p04-backup` and retrying with a fresh cache resolved it. No persistent tooling workaround or dependency change was required. Builds used approved execution outside the sandbox because earlier tasks established `spawn EPERM` for workers.
- Inspected all four dynamic Compare route output traces: each includes all 560 snippet assets and their README, so the runtime file dependencies are retained. No tracing configuration was needed.
- `git diff --check`: passed. Final review is limited to snippet extraction, loading/validation boundaries, root-tool exclusions, tests, and task documentation.

Unverified: The complete snippet compilation projects are still P0.5 work. This migration preserves the original educational fragments and does not claim they all compile as standalone React Native or Android files. The initial TypeScript test fixture caused expensive inference over raw roadmap unions; using the existing normalized Roadmap model restored the typecheck to normal duration.

Gaps found: None beyond the compilation harness already planned in P0.5. P0.6 still owns automatic discovery of stage files for lessons without explicit examples and missing-stage UI/status reporting.

Open questions: None.

## P0.5 — CI that compiles every snippet — 2026-10-14 — Codex

Status: Implementation and local verification are ready. P0.5 remains unchecked because the acceptance criteria also require a green GitHub Actions run on a clean checkout. No push or merge was performed; the invoked plan explicitly prohibits both.

Changed: Added independent verification projects under `verify/rn` and `verify/android`, root `verify:rn`, `verify:android`, and `verify` scripts, and a three-job CI workflow. RN has its own exact dependency pins and frozen Bun lockfile, strict TypeScript configuration, and type-only application fixtures. Framework globals alias the installed package types. Android uses the official Gradle 8.11.1 wrapper, AGP 8.9.2, Kotlin/Compose compiler 2.1.20, Compose BOM 2025.04.01, and an explicit library catalog. All Kotlin snippets are compiled in one Android library with unique packages, actual Android/Compose dependencies, application fixtures, and real generated resources. The Bun runner discovers the SDK and invokes the wrapper through Java on both platforms. Added version and authoring documentation; ignored verification dependencies, build outputs, Gradle caches, and Kotlin error logs. Root website dependencies and the root lockfile are unchanged. D1, D2, and D6 use the defaults presented before the user's instruction to continue P0.5.

Application imports, omitted models/services, and enclosing scopes stay outside display regions where possible. Comparing the 554 RN/Kotlin display regions with the P0.4 commit found 16 intentional visible corrections; the other 538 regions and six shell files are unchanged:

- Added the required `FlatList.renderItem` in Derived State production, Loading State production, Pagination basic, and Window Insets production. Changed the Local Storage Learn basic write to use `"dark"` instead of reading the later `theme` declaration before initialization.
- Fixed the missing closing brace in the Back Navigation dialog and supplied a real `rememberDraggableState` to Compose's `draggable`. Updated the existing gesture content test to require that state and retain the horizontal-orientation assertion.
- Added named functions around mixed declaration/call fragments in Loading State production, Pagination applied, Route Parameters basic/Learn basic, and Sealed Types Learn basic. Split Pagination production into an actual `FeedViewModel` and composable `FeedScreen`, removing the duplicate local `posts` declarations and placing `viewModelScope` on its owner.
- Used `ProfileDestination` for the route type in Deep Link Learn basic and Route Parameters applied, keeping the separate `ProfileRoute` UI function. Replaced the UI test's unconfigured Truth assertion with the already pinned JUnit `assertEquals`.

Verification:

- `bun run verify`: passed with Temurin JDK 17.0.20.1+1 and Android platform/build tools 35/35.0.0. A source-list audit confirms all 274 RN snippets are included; all 280 Kotlin packages have emitted class files. No snippet exclusions, `any`, TypeScript suppression directives, or fake framework declarations were introduced. The Android compile emits one non-fatal warning about the RemoteMediator override parameter being named `type` rather than `loadType`; its API signature still compiles.
- Negative RN check: temporarily inserted `<Text unknownPropForVerification={true} />` in `component/react-native/basic.tsx`. The exact `verify:rn` job command returned exit code 2 with a real `TextProps` diagnostic. Restored the original file and verified its SHA-256 matched.
- Negative Kotlin check: temporarily inserted `Text(text = "failure", unknownNamedParameter = true)` in `component/kotlin/basic.kt`. The exact `verify:android` job command returned exit code 1 with an overload-resolution diagnostic for Material 3 `Text` in that file. Restored the original file and verified its SHA-256 matched. The combined verification command then passed again.
- Built a fresh source snapshot from the P0.4 Git archive plus task changes, with new root/RN installs using `bun install --frozen-lockfile` and no reused project build outputs. `bun lint`, `bun typecheck`, `bun test` (107 passed, 0 failed; 3,330 assertions), `bun run build` (690 static pages), and `bun run verify` all passed there. Android reused downloaded Gradle/Maven artifacts but compiled the fresh project outputs with JDK 17. This is local Windows evidence, not a GitHub/Linux CI result.
- Checked the CI YAML, the three job names, and immutable 40-character action pins. The Android job uses Java 17 and Gradle caching. The site job uses `bun run build`: Bun 1.2.18 treats `bun build` as its built-in bundler rather than the package script. Verified the wrapper JAR against Gradle's official checksum: `2db75c40782f5e8ba1fc278a5574bab070adccb2d21ca5a6e5ed840888448046`. The distribution checksum is also pinned in wrapper properties.
- Inspected all four generated Compare route traces: each contains the 560 snippet assets and their README, with no verification-project dependencies. Checked all 554 display regions for leaked verification scaffolding; none was present. Existing locale tests confirm the shared code remains identical between English and Vietnamese.
- An intermediate PowerShell newline-normalization step incorrectly decoded UTF-8 in six Kotlin files. The fresh-source test caught the changed ellipsis. Restored the UTF-8 text, compared every display region again, and reran the successful fresh-source tests, Android compilation, and web build. No encoding changes remain. The nested snapshot build warned that it inferred the parent workspace root from multiple lockfiles; the build still passed. No Next.js configuration workaround was added.
- Prettier checks passed for changed supported source/configuration files and the new version/verification documentation. `docs/PLAN.md` has a pre-existing Prettier warning, reproduced against its unmodified Git version; unrelated formatting was preserved. `git diff --check` passed.

Official review: [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/), [AGP 8.9 compatibility](https://developer.android.com/build/releases/agp-8-9-0-release-notes), [Kotlin 2.1.20](https://kotlinlang.org/docs/whatsnew2120.html), [Compose BOM mapping](https://developer.android.com/develop/ui/compose/bom/bom-mapping), and [WindowSizeClass](https://developer.android.com/reference/kotlin/androidx/window/core/layout/WindowSizeClass). Window Core 1.4.0 is pinned explicitly because the displayed breakpoint API was introduced there. API signatures were also checked directly by the installed RN package types and Kotlin compiler against the resolved libraries. CI tooling was reviewed against the official [Ubuntu 24.04 runner inventory](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md) and [Gradle action documentation](https://github.com/gradle/actions/blob/main/docs/setup-gradle.md).

Unverified: GitHub Actions has not run on this branch. These commands compile fixtures; they do not execute the RN/Compose testing snippets, run an emulator, validate Room SQL/generated implementations, process Hilt annotations, link native modules, or build a release app. These limits are documented in `docs/VERSIONS.md` and `verify/README.md`.

Gaps found: P0.5 acceptance remains open until all three GitHub jobs are green after an authorized push. No additional content backlog was added.

Open questions: None for implementation. The owner must arrange the remote CI run before marking P0.5 complete.

## P0.6 — Per-stage code and the coverage report — 2026-10-14 — Codex

Changed: The roadmap validator now receives validated concepts so missing stage examples can inherit the implementation language, including shell examples, and discover source/target files by convention. Explicit examples and distinct Learn basic references retain priority. Stage example maps may be partial or empty; concepts still require at least two implementations. Added shared stage IDs and an optional snippet reader that returns undefined only for ENOENT. Malformed snippets, filesystem errors, and broken explicit references still fail validation. The loader never substitutes basic code for a missing later stage.

Learn retains the existing server-highlighted `CodeComparison` when both sides exist. When either side is absent, it renders available code with the existing server `CodeBlock` and identifies each missing technology with a localized message. Both localized and legacy lesson routes supply the message. Added `bun run content:status`, its reusable report functions, and documentation of required cells and exit behavior. Required coverage comes from published roadmap source/target pairs, with canonical technology/stage ordering and English/Vietnamese columns. English fallback does not count as a Vietnamese translation. Duplicate cells across roadmap directions remain incomplete if any required occurrence is missing. The Bun CLI registers the server-only marker as an empty runtime module because Next.js normally resolves that compiler boundary; no dependency or client boundary was added.

Verification:

- `bun test`: 122 passed, 0 failed; 3,392 assertions. Fifteen new cases cover convention discovery for every stage, explicit Learn precedence, partial examples, non-default shell languages, missing files without basic-code substitution, broken references, unrelated technology pairs, coverage and translation gaps, duplicate roadmap directions, and server rendering of complete/partial/missing stage comparisons in English and Vietnamese. Rendering tests use the real Next pathname context and shared Shiki highlighter. Two existing validation tests changed only to pass concepts instead of a slug set.
- `bun run content:status --strict`: passed with 864 required cells, 864 ready, 0 missing (72 concepts × 2 roadmap technologies × 3 stages × 2 locales). The matrix contains 432 data rows, one header, and a summary.
- Temporarily replaced the roadmap input with one convention-only lesson and moved its RN applied snippet to a workspace backup. The real CLI printed 12 required cells, 10 ready, 2 missing; normal mode returned 0 and `--strict` returned 1. Restored the metadata and snippet in a finally block and verified both SHA-256 hashes matched their originals. The restored strict command passed again. `git diff -- content` is empty: no educational code or metadata changes remain.
- `bun lint`, `bun typecheck`, and `bun run verify`: passed. RN still checks 274 snippets; Android still compiles 280 Kotlin snippets with the existing JDK 17/SDK setup. The snippet verification projects and their dependency pins are unchanged.
- `bun run build`: passed, generating 690 static pages. The generated English and Vietnamese Component lesson pages each contain three stage headings and 12 highlighted stage code blocks across the existing desktop/mobile layouts, with no missing-code message. All four Compare output traces still include 560 snippet assets plus their README.
- Prettier checks for changed supported source/configuration/documentation files and `git diff --check`: passed. Preserved the existing formatting of PLAN and the user's unrelated AGENTS/prompt changes.

Unverified: No task acceptance item remains. Browser interaction was not retested because this change adds no client behavior; server-rendering tests and generated HTML cover the new states. P0.5's separate GitHub Actions acceptance remains pending and its checkbox is unchanged.

Gaps found: None. Current required roadmap coverage is complete; unpublished Flutter/SwiftUI tracks are outside the report's required cells.

Open questions: None.
