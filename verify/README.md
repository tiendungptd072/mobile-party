# Snippet compilation

Install the website normally, then install the independent React Native verification dependencies:

```sh
cd verify/rn
bun install --frozen-lockfile
cd ../..
bun run verify:rn
```

For Android, install JDK 17, Android platform 35, and build tools 35.0.0. Set `JAVA_HOME` and `ANDROID_HOME`, then run:

```sh
bun run verify:android
```

`bun run verify` runs both checks. No emulator is required. Versions and limitations are documented in [docs/VERSIONS.md](../docs/VERSIONS.md).

## Authoring

Keep application context, imports, packages, and enclosing functions outside the single `show` region when possible. The website displays only that region. A fragment with a declaration and a call may need a visible function to make the combined example valid Kotlin.

RN framework names in `rn/support/frameworks.ts` alias the installed package types. `rn/support/application.ts` and per-file declarations provide type-only application contracts. `rootDirs` resolves an omitted application file such as `./AppRoot` to its support counterpart. Never declare fake React, React Native, navigation, or testing library modules.

Android's source set includes all Kotlin snippets and `android/support`. Each snippet has a distinct package. Context files under `android/support/contexts` use the matching package when a lesson requires a different application model. Shared fixtures use `verification.support`. Android resources under the library module let resource examples resolve the generated `R` class.

Support implementations may return `TODO()` or `Unit` because this project only compiles. Do not execute them, or weaken types to make a broken snippet pass. Do not add `any`, `@ts-ignore`, `@ts-nocheck`, fake framework APIs, or snippet exclusions. Correct genuine API errors in the displayed code and record those corrections in the task log.

CI has independent `site`, `snippets-rn`, and `snippets-android` jobs. The Android job uses Java 17, the checked-in Gradle wrapper, wrapper validation, and a Gradle cache. The RN job installs its own frozen lockfile.
