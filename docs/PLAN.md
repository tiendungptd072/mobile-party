# Plan: React Native ⇄ Jetpack Compose (Kotlin)

Executable plan for AI coding agents (Codex, Claude Code) and humans. Work is split into small tasks with IDs, dependencies, and acceptance criteria. Tick a checkbox only when **every** Accept item is met.

Legend: `☐` todo · `☑` done · `⚠ Owner` = needs a human decision or human-run check before or during the task. "Level" = Task Gate level from `AGENTS.md`.

---

## 0. Rules for agents (read first)

1. Do exactly **one task per run**: the first unchecked task whose dependencies are all checked, unless the human names a task ID.
2. Follow `AGENTS.md` and the nearest scoped `AGENTS.md` (`src/AGENTS.md`, `content/AGENTS.md`). Read only the docs the task needs.
3. Bun only. Do not add dependencies to the root `package.json` unless the task says so. Verification projects under `verify/` and the reference app have their own manifests.
4. Do not expand scope. Do not refactor unrelated code. Do not reformat unrelated files.
5. Never invent APIs. Verify version-sensitive APIs against official docs for the versions in `docs/VERSIONS.md` (created in P0.9). If a claim cannot be verified, keep it out of content and list it as "Unverified" in the report.
6. If a task is marked `⚠ Owner` and the matching decision in section 2 is not confirmed, stop and ask.
7. Never claim a command passed if it was not run. If a command cannot run (no network, no Android SDK, no emulator), state which command and why, and mark the task `☐ (blocked: needs human run)`.
8. After finishing: tick the checkbox here, append an entry to `docs/PLAN-LOG.md` (template in section 12), commit on branch `plan/<task-id>` with message `plan(<task-id>): <summary>`. Do not push or merge.

## 1. Goal and Definition of Done

**Goal:** a React Native developer can port a real app to Jetpack Compose, and an Android developer can port to React Native, using only this site and the porting playbook, without looking things up elsewhere.

The RN ⇄ Kotlin track is done only when all hold:

1. The reference app (Phase 5) is ported in both directions using the site, with every gap recorded and fixed.
2. Every snippet compiles in CI (TypeScript for RN, Gradle/Kotlin for Compose).
3. Every concept meets the Concept Definition of Done (section 6), in `en` and `vi`.
4. No P0 or P1 gap remains open in `docs/PLAN-LOG.md`.

Flutter and SwiftUI are **out of scope** until Phase 6 passes. Phase 0 only makes the schema ready for them.

## 2. Decisions (defaults pre-filled; edit before starting)

| ID | Decision | Default | Confirmed |
|---|---|---|---|
| D1 | RN runtime | Expo (managed) + TypeScript. Mark bare-RN-only content explicitly. | ☐ |
| D2 | Compose stack | Material 3, Navigation Compose, Hilt, Retrofit + kotlinx.serialization, Coil, DataStore | ☐ |
| D3 | RN-side libraries | React state + Context in basic concepts. Zustand / TanStack Query only in dedicated concepts. | ☐ |
| D4 | Reference app location | Separate repository, linked from the site. Keeps this repo dependency-light. | ☐ |
| D5 | Localization | `en` is source of truth. `vi` is an overlay. A `vi sync` task closes each phase. Missing `vi` falls back to `en` with a visible notice. | ☐ |
| D6 | Version pinning | One `docs/VERSIONS.md`; verification projects pin the same versions. | ☐ |
| D7 | `AGENTS.md` Task Gate names GPT models. Add a model-agnostic note? | Do not change `AGENTS.md`; non-GPT agents report the level and continue. | ☐ |

## 3. Working agreements

- **Branch:** `plan/<task-id>`. **Commit:** `plan(<task-id>): <summary>`.
- **File naming:** kebab-case (see `docs/CODING-CONVENTION.md`).
- **Content language:** repo files, code, comments, and commit messages in English. Vietnamese only in `vi` locale files.
- **Equivalent behavior:** RN and Compose examples must implement the same behavior (`docs/CONTENT-GUIDE.md` §13).
- **Relationship labels:** `equivalent`, `similar`, or `different`, with an explanation of where the analogy stops.

## 4. Verification commands

```text
bun lint
bun typecheck
bun test
bun build
bun run verify          # added in P0.5: RN type-check + Android compile of all snippets
bun run content:status  # added in P0.6: coverage matrix concept × tech × stage × locale
```

Note: before P0.1, `bun build` needs network access to Google Fonts and fails offline. That is an environment issue, not a content bug.

---

## 5. Phase 0 — Foundation fixes (blocks all content phases)

### P0.1 ☑ Self-host fonts so build works offline — Level 1
- **Files:** `app/layout.tsx`, new `src/assets/fonts/` (or `app/fonts/`).
- **Do:** replace `next/font/google` (Geist, Geist Mono) with `next/font/local`. Obtain the font files from the official Geist release and commit them. Do not add the `geist` package as a runtime dependency.
- **Accept:** `bun build` succeeds with no network; fonts render as before; license file for the fonts is included.

### P0.2 ☑ Fix incorrect examples and ordering — Level 1–2
- **Files:** `content/concepts/async.ts`, `content/concepts/api-request.ts`, `content/recipes/index.ts`, `content/roadmaps/react-native-to-kotlin.ts`, related tests.
- **Do:**
  1. `async` (RN): `fetch("/users/...")` uses a relative URL, which does not work in React Native. Use a configured base URL.
  2. `async` and `api-request`: make RN and Kotlin examples behave the same (error handling, cancellation/scope, same inputs and outputs).
  3. Recipe `api-request` (Kotlin): `runCatching` inside `viewModelScope.launch` swallows `CancellationException`. Replace with `try/catch` that rethrows `CancellationException`.
  4. Recipe `refresh-token` (both sides): handle concurrent 401s with a single in-flight refresh; handle refresh failure (sign-out transition).
  5. Roadmap: place Local State before Text Input (the Text Input exercise relies on state hoisting).
- **Accept:** corrected code verified against official docs; relationship explanations and `architectureNotes` updated; `bun test` passes; any changed test is justified in the log.

### P0.3 ☑ Make the schema truly pair-agnostic — Level 3
- **Files:** `src/lib/content/schema.ts`, `src/types/*.ts`, `src/lib/content/content.test.ts`, `docs/content-model.md`.
- **Do:** remove the hard requirement that every concept has `react-native` and `kotlin` implementations. Require **at least two** implementations. Relationships must still reference existing implementations. Relationships stay optional overrides; do not add a rule that every pair must be described.
- **Accept:** a test concept with only `flutter` + `swiftui` validates; a concept with one implementation is rejected; existing content unchanged; docs updated.

### P0.4 ☐ Snippets as real files, loaded at build time — Level 3
- **Files:** new `content/snippets/**`, new `src/lib/content/snippets.ts`, `src/lib/content/schema.ts`, `content/concepts/*.ts`, `content/recipes/index.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierignore`, tests.
- **Convention:**
  ```text
  content/snippets/<concept-slug>/<technology>/<stage>.<ext>
    stage: basic | applied | production
    ext:   tsx (react-native) | kt (kotlin)
  content/snippets/recipes/<recipe-slug>/<technology>/main.<ext>
  ```
  `recipes` is a reserved slug. The `basic` snippet is what Compare shows as the implementation.
- **Display region:** only the code between `// #region show` and `// #endregion` is displayed; imports, `package` lines, and support code stay outside it. A file without a region displays in full. The loader strips the markers.
- **Kotlin rule:** each file declares its own package, `package snippets.<slug_with_underscores>.<stage>` (recipes: `snippets.recipes.<slug_with_underscores>`), so top-level names never collide.
- **Do:** implement a server-only loader that reads files with `node:fs` at build time and fills `implementation.code`. Migrate the 8 existing concepts and the 6 recipes. If `code` is omitted, the loader resolves the file by convention. After migration, the validator rejects inline `code` for `tsx`, `typescript`, and `kotlin`. A missing file produces a `ContentValidationError` naming the path. Exclude `content/snippets/**` and `verify/**` from the root `tsconfig.json`, ESLint, and Prettier (Kotlin is not handled by Prettier).
- **Accept:** the site renders identical code (minus markers); the search index does not contain snippet bodies; tests cover region extraction, missing file, and inline-code rejection; `bun typecheck` does not try to compile snippets.

### P0.5 ☐ CI that compiles every snippet — Level 2–3 (depends on P0.4) `⚠ Owner` (needs a human run if no Android SDK locally)
- **Files:** new `verify/rn/`, new `verify/android/`, `.github/workflows/ci.yml`, root `package.json` scripts, `docs/VERSIONS.md` (draft).
- **Do:**
  - `verify/rn/`: its own `package.json` and strict `tsconfig.json` that includes `../../content/snippets/**/react-native/**`. Add type-only stubs in `verify/rn/support/` (for example `User`, `UserRow`, `Avatar`, API client) so fragments compile.
  - `verify/android/`: Gradle (Kotlin DSL) library module with the Compose BOM and libraries pinned in a version catalog (decision D2). Source sets include `../../content/snippets/**/kotlin` plus `verify/android/support/` stubs. Compile task: `:snippets:compileDebugKotlin`.
  - Root scripts: `verify:rn`, `verify:android`, `verify`.
  - CI jobs: `site` (frozen install, lint, typecheck, test, build), `snippets-rn`, `snippets-android` (Java 17, Gradle cache).
- **Accept:** CI green on a clean checkout; deliberately breaking one RN snippet fails `snippets-rn` and breaking one Kotlin snippet fails `snippets-android` (do this once, record it in the log, revert it).

### P0.6 ☐ Per-stage code and the coverage report — Level 2 (depends on P0.4)
- **Files:** `src/types/roadmap.ts`, `src/lib/content/schema.ts`, Learn lesson page and components, new `scripts/content-status.ts`, tests.
- **Do:** let the loader attach stage examples by convention: for each roadmap lesson stage, if `content/snippets/<concept>/<tech>/<stage>.<ext>` exists, expose it as that stage's example for the pair's source and target. Render source and target stage code in the Learn lesson using the existing `CodeComparison`; show an explicit "not yet written" state when absent. Add `bun run content:status`, which prints a matrix of concept × technology × stage × locale and exits non-zero when run with `--strict` and any required cell is missing.
- **Accept:** existing lessons still render; a lesson with all three stages shows code per stage; `content:status` output is correct on the current content; tests cover resolution and the missing state.

### P0.7 ☐ Direction-specific guidance — Level 3 (depends on P0.3)
- **Files:** `src/types/concept.ts`, `src/lib/content/schema.ts`, `src/lib/compare.ts`, Learn and Compare pages, tests, `docs/content-model.md`, `docs/ARCHITECTURE.md` (decision record).
- **Do:** add an optional `directional` field keyed by the existing pair format (`"react-native:kotlin"`, same as `serializeTechnologyPair`) with optional `mentalModel`, `differences`, `commonMistakes`, `productionNotes`. Add a resolver (for example `getConceptGuidance(concept, pair)`): directional entry first, base fields as fallback. Update pages to use it. Base fields stay neutral; existing content is unchanged.
- **Accept:** tests prove both directions and the fallback; reversing the pair in the UI switches guidance when overrides exist; the decision is recorded in `docs/ARCHITECTURE.md`.

### P0.8 ☐ Localization model (`en` source, `vi` overlay) — Level 3 `⚠ Owner` (public URL change: confirm before deleting root `app/*` routes)
- **Context:** `content/AGENTS.md` requires educational content in `en` and `vi`, but today the `[locale]` routes re-export the root pages and ignore the locale, and all content is English.
- **Files:** `app/**`, `proxy.ts`, `src/lib/i18n/*`, new `content/locales/vi/**`, `src/lib/content/*`, `src/lib/site.ts`, tests, `docs/ARCHITECTURE.md`.
- **Do:**
  1. Overlay files under `content/locales/vi/{concepts,roadmaps,recipes}/` containing **only translatable strings**, in the same structure as the `en` source: titles, descriptions, implementation `name`/`summary`, relationship `explanation`, `mentalModel`, `differences`, `commonMistakes`, `productionNotes`, lesson `title`/`exercise`/`checklist`, stage `title`/`description`, recipe text. Never translate IDs, slugs, code, API names, or filenames.
  2. Validator: overlay arrays have the same lengths as `en`; unknown keys rejected.
  3. Loader merges overlay over `en`; a missing overlay falls back to `en` and shows a "not yet translated" notice.
  4. Make pages actually read the locale. Put the real implementations under `app/[locale]/` and remove the duplicated root `app/*` pages **only after** confirming `proxy.ts` redirects cover every old URL. Add `hreflang` alternates to sitemap and metadata.
  5. Extend UI strings in `src/lib/i18n/messages.ts`; add the Vietnamese UI strings.
- **Accept:** `/vi/...` renders Vietnamese for a translated sample concept and falls back for the rest; old root URLs still resolve (redirect); sitemap lists both locales; tests cover merge, fallback, and structure mismatch.

### P0.9 ☐ Sync documentation — Level 1 (after P0.3–P0.8)
- **Files:** `docs/content-model.md`, `docs/CONTENT-GUIDE.md`, `docs/PRODUCT.md`, `docs/roadmap.md`, `docs/ARCHITECTURE.md`, `README.md`, new `docs/VERSIONS.md`, new `docs/PLAN-LOG.md`.
- **Do:** make docs describe the code as it is: concepts are TypeScript objects plus snippet files (not MDX frontmatter), the real category list (`src/types/concept.ts`), roadmap lesson fields (`exercise`, `checklist`, `stages`), snippets, directional guidance, localization. Replace the default create-next-app `README.md` with a real one (purpose, commands, structure, contribution flow). Add `docs/VERSIONS.md` listing every pinned version (RN/Expo, React, TypeScript, Kotlin, Compose BOM, Navigation Compose, Hilt, Retrofit, kotlinx.serialization, Coil, DataStore). In `docs/PRODUCT.md` add the porting playbook as in scope; AI conversion stays out of scope.
- **Accept:** no doc contradicts the code; `bun lint` and `bun typecheck` still pass.

---

## 6. Concept Definition of Done

A concept task is done only when all hold. Include this checklist, with ✓/✗, in the final report.

1. `content/concepts/<slug>.ts` created and registered in `content/concepts/index.ts`; slug is kebab-case; category is in `CONCEPT_CATEGORIES`.
2. Snippets exist for React Native and Kotlin at all three stages (`basic`, `applied`, `production`), compile in CI, and implement the same behavior on both sides.
3. A relationship label with an explanation that says where the analogy stops. No forced one-to-one mapping.
4. `mentalModel`, `differences`, `commonMistakes`, `productionNotes` are present. `directional` overrides exist where direction matters (required for P4).
5. `aliases` and `keywords` are useful for search and contain the real API names; no duplicate alias across concepts.
6. A roadmap lesson in `react-native-to-kotlin.ts` with `exercise`, `checklist`, and three stage descriptions. Related concepts and recipes are linked using canonical slugs.
7. Version-sensitive APIs verified against the versions in `docs/VERSIONS.md`.
8. `bun lint`, `bun typecheck`, `bun test`, `bun build`, and `bun run verify` pass; tests updated.
9. `vi` is **not** written in the concept task; it is covered by the phase's `vi sync` task.

## 7. Phases 1–3 — Content backlog

Relationship labels are proposals; confirm while writing. "Must cover" lists are minimums.

### Phase 1 — Blocking concepts (P0 priority)

| Task | Slug | React Native | Compose | Proposed | Must cover |
|---|---|---|---|---|---|
| P1.1 ☐ | `side-effects` | `useEffect` + deps, cleanup | `LaunchedEffect`, `DisposableEffect`, `SideEffect`, `rememberUpdatedState`, `snapshotFlow` | different | Mount, key changes, cleanup, cancellation, stale closures. Pitfalls: `LaunchedEffect(Unit)` with changing captures, work in the composition body, effect vs event handler. |
| P1.2 ☐ | `shared-state` | Context + reducer (Zustand mentioned only) | `ViewModel`, `StateFlow`, `collectAsStateWithLifecycle`, UI-state model | different | Lifetime table: `remember` vs `rememberSaveable` vs `ViewModel`; events up, state down; surviving configuration change. |
| P1.3 ☐ | `navigation` | React Navigation or Expo Router (per D1) | Navigation Compose (`NavHost`, routes, args, back stack, bottom bar) | similar | Passing IDs not objects, `popUpTo`, returning results, ViewModel scoped to a back-stack entry. Verify type-safe route APIs for the pinned version. |
| P1.4 ☐ | `derived-state` | `useMemo`, `useCallback` | `remember(key)`, `derivedStateOf` | similar | When not to memoize; Compose skipping and stability. |
| P1.5 ☐ | `refs-context` | `useRef`, Context | `remember {}`, `FocusRequester`, `CompositionLocal` | different | Non-observable holders; `compositionLocalOf` vs `staticCompositionLocalOf`. |
| P1.6 ☐ | — | Integrate Phase 1 lessons into the roadmap (new sections or order), update links between concepts and recipes | | | Roadmap validates; lesson order makes pedagogical sense. |
| P1.7 ☐ | — | `vi sync` for Phase 1 and everything earlier that is untranslated | | | `content:status --strict` shows `vi` complete for these concepts. |

### Phase 2 — Core UI and styling (P1 priority)

| Task | Slug | React Native | Compose | Proposed | Must cover |
|---|---|---|---|---|---|
| P2.1 ☐ | `scrolling` | `ScrollView` | `verticalScroll`, `LazyColumn` | similar | When to use which. |
| P2.2 ☐ | `pressable` | `Pressable` | `clickable`, `Button` | similar | Ripple, disabled, accessibility roles. |
| P2.3 ☐ | `image` | `Image` | Coil `AsyncImage` | similar | Remote images, placeholders, content descriptions. |
| P2.4 ☐ | `overlays` | `Modal` | `Dialog`, `ModalBottomSheet` | similar | State-driven visibility; dismiss handling. |
| P2.5 ☐ | `insets-keyboard` | `SafeAreaView`, `KeyboardAvoidingView` | `WindowInsets`, `imePadding` | different | Edge-to-edge; verify for the pinned API level. |
| P2.6 ☐ | `theming` | `StyleSheet`, theme object/Context | `MaterialTheme` | different | Tokens, dark mode. |
| P2.7 ☐ | `forms` | controlled inputs + validation | `TextField` options + state holder | similar | Keyboard type, secure entry, IME action, focus order. |
| P2.8 ☐ | `list-variants` | header, empty, separator, pull-to-refresh | `stickyHeader`, `item {}`, `PullToRefreshBox` | similar | Verify pull-to-refresh API for the pinned Material 3 version. |
| P2.9 ☐ | — | Roadmap integration | | | |
| P2.10 ☐ | — | `vi sync` | | | |

### Phase 3 — Data and platform (P1–P2 priority)

| Task | Slug | React Native | Compose | Proposed | Must cover |
|---|---|---|---|---|---|
| P3.1 ☐ | `local-storage` | `AsyncStorage` | DataStore | similar | Async API, migration, what not to store. |
| P3.2 ☐ | `serialization-errors` | JSON + type guard | kotlinx.serialization, `Result`/sealed errors | different | Transport vs HTTP vs parse errors. |
| P3.3 ☐ | `dependency-injection` | Context / module singleton | Hilt | different | Scoping and testability. |
| P3.4 ☐ | `permissions` | Expo / `PermissionsAndroid` | Activity Result API | different | Rationale flow, denied-permanently state. |
| P3.5 ☐ | `push-notifications` | Expo Notifications / FCM | FCM + `NotificationManager` | similar | Channels, token refresh, tap → deep link. |
| P3.6 ☐ | `native-interop` | Native module / TurboModule | Kotlin side of a module | different | Both directions of the boundary. |
| P3.7 ☐ | `build-release` | EAS / Gradle, env config | Gradle, `BuildConfig`, signing, R8 | different | Variants, secrets handling. |
| P3.8 ☐ | `testing` | Jest + React Native Testing Library | JUnit + Compose test | similar | Rendering vs semantics tests. |
| P3.9 ☐ | `animation` | `Animated` / Reanimated | `animate*AsState`, `AnimatedVisibility` | similar | State-driven vs imperative. |
| P3.10 ☐ | recipes | Add recipes: `login-session`, `form-validation`, `pull-to-refresh-pagination`, `offline-cache`, `push-to-deep-link` | | | Each recipe has flow, both implementations (snippet files), architecture notes. |
| P3.11 ☐ | — | Roadmap integration | | | |
| P3.12 ☐ | — | `vi sync` | | | |

---

## 8. Phase 4 — Kotlin → React Native direction

- **P4.1 ☐** Add `content/roadmaps/kotlin-to-react-native.ts`. Reuse concepts; order lessons for someone who knows Compose first. Register it. Accept: `/learn/kotlin/react-native` lists lessons and every `conceptSlug` resolves.
- **P4.2 ☐** Add `directional["kotlin:react-native"]` guidance to every concept. Write it from the Android developer's view: stale closures, `useEffect` dependency arrays, re-renders triggered by the parent, `key` in lists, state lost on unmount, JS thread vs UI thread. Accept: no concept relies only on RN→Kotlin phrasing.
- **P4.3 ☐** Verify pair switching in both directions: lesson preserved when it exists, relationship labels symmetric, stage code shows source/target correctly. Add tests in the pair utilities.
- **P4.4 ☐** `vi sync`.

## 9. Phase 5 — Reference app and porting playbook

Reference app lives in a separate repo (D4). Tasks marked `⚠ Owner` need a human with an emulator/device.

- **P5.1 ☐** `docs/reference-app-spec.md`: 5 screens (login, list with pagination, detail, edit-profile form, settings), API contract, token storage and refresh, push → deep link, and acceptance flows written as steps. This is the behavior contract both apps must meet.
- **P5.2 ☐** Mock API (small Bun server) implementing the contract, including 401 and failure injection.
- **P5.3 ☐ `⚠ Owner`** React Native (Expo, TypeScript) app meeting the spec.
- **P5.4 ☐ `⚠ Owner`** Compose app meeting the spec, built **by following the site** (not by recalling from memory).
- **P5.5 ☐ `⚠ Owner`** Shared end-to-end flows (for example Maestro) that run on both apps. Passing flows = equivalent behavior.
- **P5.6 ☐** `docs/PORTING.md` and a generated machine-readable mapping. Playbook: port by vertical slice (domain models → networking/repository → state holder → UI → tests), with a post-port review checklist (effects, state lifetime, cancellation, list keys, insets). Add `bun run build:mapping` that writes `public/porting/rn-to-kotlin.json` (and the reverse) from validated content, including relationship labels and "not equivalent" warnings.
- **P5.7 ☐ `⚠ Owner`** Port trials in both directions. For each screen record: time taken, every lookup outside the site, behavior bugs caught by E2E. Each gap becomes a backlog entry (P0/P1/P2) in `docs/PLAN-LOG.md` and, if P0 or P1, a new content task in this file.

## 10. Phase 6 — Audit and gate

- **P6.1 ☐** Audit: keyboard access, focus, contrast, responsive layout, search quality, `content:status --strict` fully green.
- **P6.2 ☐** Re-verify every pinned version and snippet against current docs; update `docs/VERSIONS.md`.
- **P6.3 ☐** Confirm `vi` completeness and glossary consistency.
- **P6.4 ☐ `⚠ Owner`** Go/no-go for Flutter and SwiftUI: confirm Phase 0 schema work holds for a third technology by validating a sample concept with three implementations.

## 11. Risks

- **Stale content:** pinned versions, CI compile, periodic re-verification (P6.2).
- **False equivalence:** relationship labels and "where the analogy stops" are mandatory.
- **Scope creep:** add a concept only when the reference app or a port trial exposes a gap.
- **Android tooling cost in CI:** if full compilation is too heavy at first, start with `kotlinc`-only syntax checks and move up; record the choice in the log.
- **Localization drift:** `vi` lags `en` between phases; the `vi sync` task and `content:status` make drift visible.

## 12. `docs/PLAN-LOG.md` entry template

```text
## <task-id> — <title> — <YYYY-MM-DD> — <agent>
Changed: <files / summary>
Verification: <commands and results; note anything that could not run and why>
Unverified: <claims not checked against official docs, or "none">
Gaps found: <new backlog items with priority P0/P1/P2, or "none">
Open questions: <for the owner, or "none">
```
