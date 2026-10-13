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
