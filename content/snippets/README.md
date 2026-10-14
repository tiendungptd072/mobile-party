# Snippet files

The server-only content loader reads these files and exposes their display code to Compare, Learn, and Recipes. Content metadata keeps the display language, title, summary, and filename; it must not embed `tsx`, `typescript`, or `kotlin` code.

Default paths:

```text
<concept-slug>/<technology>/basic.tsx
<concept-slug>/<technology>/applied.tsx
<concept-slug>/<technology>/production.tsx
recipes/<recipe-slug>/<technology>/main.tsx
```

Use `.kt` for Kotlin, `.dart` for Dart, `.swift` for Swift, `.json` for JSON, and `.sh` for shell commands. Both `tsx` and `typescript` use `.tsx` files. `recipes` is reserved and cannot be a concept slug.

Source implementation metadata may include `snippet`, a path relative to this directory. Existing Learn examples that differ from Compare use `learn-basic.tsx` or `learn-basic.kt`. This explicit reference preserves their original code; it does not change the `basic` stage ID or the displayed filename. The loader removes the reference from the normalized UI model and fills `code`.

Use one display region to hide package declarations, imports, and support code:

```text
// #region show
displayed code
// #endregion
```

Files without markers display in full. Shell examples use this full-file form. Empty, incomplete, reversed, or repeated display regions fail validation.

Every Kotlin file has a unique package: `snippets.<slug_with_underscores>.<stage>`, or `snippets.<slug_with_underscores>.learn_basic` for a distinct Learn basic example. Recipe packages use `snippets.recipes.<slug_with_underscores>`. Package declarations stay outside the display region.

The root TypeScript, ESLint, and Prettier configurations exclude this directory and `verify/`. `bun run verify:rn` checks every React Native TSX file with the pinned package types; `bun run verify:android` compiles every Kotlin file against the pinned Android libraries. Install and context instructions are in `verify/README.md`; versions and check limitations are in `docs/VERSIONS.md`. Application fixtures and enclosing scopes outside the display region are required for fragments that omit their host application context.
