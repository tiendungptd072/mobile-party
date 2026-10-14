# Verification versions (draft)

These are the P0.5 compilation baselines, not a promise that every native integration runs in Expo Go. The owner confirmed D1, D2, and D6 on 2026-10-13. P0.9 will reconcile the remaining project documentation with this baseline.

The website and snippet projects install independently. Root dependencies and the root lockfile govern the Next.js website; they do not determine React Native's React version. Do not add Android or React Native dependencies to the website manifest.

## Toolchain

| Tool                                                  | Version |
| ----------------------------------------------------- | ------- |
| Bun                                                   | 1.2.18  |
| React Native TypeScript                               | 5.9.3   |
| Gradle wrapper                                        | 8.11.1  |
| Android Gradle Plugin                                 | 8.9.2   |
| Java language/JVM target and CI runtime               | 17      |
| Android compile SDK                                   | 35      |
| Android build tools                                   | 35.0.0  |
| Android minimum SDK                                   | 23      |
| Kotlin, Compose compiler plugin, serialization plugin | 2.1.20  |

Gradle's distribution SHA-256 is pinned in `verify/android/gradle/wrapper/gradle-wrapper.properties`. The wrapper scripts and JAR come from the official Gradle `v8.11.1` tag. CI validates the wrapper through `gradle/actions/setup-gradle`.

## React Native

`verify/rn/package.json` pins every direct dependency; `verify/rn/bun.lock` pins the resolved graph. Install it with `bun install --frozen-lockfile` inside `verify/rn`.

| Package                                   | Version |
| ----------------------------------------- | ------- |
| Expo                                      | 54.0.0  |
| React Native                              | 0.81.4  |
| React and react-test-renderer             | 19.1.0  |
| @types/react                              | 19.1.16 |
| @types/jest                               | 29.5.14 |
| @react-navigation/native                  | 7.5.0   |
| @react-navigation/native-stack            | 7.3.26  |
| @tanstack/react-query                     | 5.90.2  |
| @testing-library/react-native             | 13.3.3  |
| axios                                     | 1.12.2  |
| zustand                                   | 5.0.8   |
| @react-native-async-storage/async-storage | 2.2.0   |
| react-native-keychain                     | 10.0.0  |
| react-native-safe-area-context            | 5.6.1   |
| expo-crypto                               | 15.0.7  |

Expo SDK 54 uses React Native 0.81 and React 19.1. Native modules such as Keychain require a compatible development build; typechecking does not install or link native modules. Bare React Native entry and headless-task examples remain platform-specific educational examples.

## Android libraries

`verify/android/gradle/libs.versions.toml` is the version catalog. The Compose BOM manages the versions of Compose UI, Foundation, Material 3, icons, and UI testing artifacts. Other libraries use explicit catalog versions.

| Library                                      | Version    |
| -------------------------------------------- | ---------- |
| Compose BOM                                  | 2025.04.01 |
| Activity Compose                             | 1.10.1     |
| Lifecycle                                    | 2.9.0      |
| Navigation Compose                           | 2.9.0      |
| Material 3 Adaptive                          | 1.1.0      |
| Window Core                                  | 1.4.0      |
| Core KTX                                     | 1.15.0     |
| Fragment KTX                                 | 1.8.6      |
| Room                                         | 2.7.2      |
| SQLite bundled driver                        | 2.5.2      |
| Paging                                       | 3.3.6      |
| WorkManager                                  | 2.10.1     |
| DataStore                                    | 1.1.7      |
| Biometric                                    | 1.1.0      |
| Hilt                                         | 2.56.2     |
| Hilt Navigation Compose                      | 1.2.0      |
| Retrofit and kotlinx.serialization converter | 3.0.0      |
| OkHttp                                       | 5.1.0      |
| kotlinx.serialization JSON                   | 1.8.1      |
| kotlinx.coroutines Android and test          | 1.10.2     |
| Coil Compose                                 | 3.2.0      |
| JUnit                                        | 4.13.2     |
| Turbine                                      | 1.2.1      |
| AndroidX test core                           | 1.6.1      |

Window Core is explicit because `WindowSizeClass.isWidthAtLeastBreakpoint` requires 1.4.0. Do not replace that API with a verification stub.

## Scope of the checks

Run `bun run verify:rn` for strict TypeScript and `bun run verify:android` for `:snippets:compileDebugKotlin`, or `bun run verify` for both. RN dependencies must be installed separately. Android needs a JDK and SDK; set `JAVA_HOME` and `ANDROID_HOME` when they are not discoverable. On Windows the runner also checks the standard `%LOCALAPPDATA%/Android/Sdk` location.

Every `.tsx` snippet under a `react-native` directory and every Kotlin snippet is compiled. Support files provide application models, component contracts, repositories, resources, and enclosing scopes omitted from the teaching fragments. Framework APIs use actual package types and Android libraries. Support files are compilation fixtures and are never executed by these commands.

These checks do not run an emulator, Jest/RNTL tests, instrumented Compose tests, Room's code generator/SQL validation, Hilt annotation processing, native linking, or release builds. The website's `bun test` separately executes selected request examples with controlled dependencies. Compilation establishes syntax and API/type compatibility within the supplied context; it does not prove runtime behavior.

## Official references

- [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/)
- [AGP 8.9 compatibility](https://developer.android.com/build/releases/agp-8-9-0-release-notes)
- [Kotlin 2.1.20](https://kotlinlang.org/docs/whatsnew2120.html)
- [Compose BOM mapping](https://developer.android.com/develop/ui/compose/bom/bom-mapping)
- [WindowSizeClass API](https://developer.android.com/reference/kotlin/androidx/window/core/layout/WindowSizeClass)
- [Gradle wrapper](https://docs.gradle.org/8.11.1/userguide/gradle_wrapper.html)

Review API changes and rerun both snippet checks when updating a pin. Keep this document, the RN manifest/lockfile, and the Android catalog aligned.
