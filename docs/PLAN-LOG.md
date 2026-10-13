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
