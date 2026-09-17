# Product

## Purpose

Mobile Party helps an experienced mobile developer learn another UI framework
through concepts they already understand. It supports these technology IDs:

1. `react-native` — React Native
2. `flutter` — Flutter
3. `kotlin` — Kotlin with Jetpack Compose
4. `swiftui` — Swift with SwiftUI

Comparisons are learning aids, not claims that APIs are always equivalent.
Every mapping must communicate whether it is equivalent, similar, or based on
a different mental model.

## MVP boundaries

The MVP is frontend-only and repository-backed. It has no backend, account,
database, CMS, AI conversion, community features, payment system, or browser
compiler for native frameworks.

Browser storage may persist the technology pair, theme, completed lessons,
bookmarks, roadmap progress, and display preferences. Clearing browser data is
expected to remove these values.

## Modules

- Home selects a source and target technology.
- Learn presents a pair-specific roadmap and lessons.
- Compare shows the same concept across selected technologies.
- Dictionary searches concepts, APIs, aliases, and keywords locally.
- Recipes presents real-world flows and framework implementations.
- Bookmarks lists locally saved lessons and concepts.

## Primary flow

The first complete path is React Native to Jetpack Compose:

```text
Home
  -> choose React Native and Kotlin
  -> open /learn/react-native/kotlin
  -> select Local State
  -> compare useState with remember + mutableStateOf
  -> read mental-model differences
  -> mark the lesson complete
```

The architecture must remain pair-agnostic even while this path receives the
first complete content.

## Routes

```text
/
/learn/[source]/[target]
/learn/[source]/[target]/[slug]
/compare
/compare/[concept]
/dictionary
/dictionary/[slug]
/recipes
/recipes/[slug]
/bookmarks
```

Shareable state belongs in the URL when practical. Local preferences that do
not define a public resource belong in browser storage.

## Experience requirements

- Documentation-style layout optimized for reading code on desktop.
- Responsive stacked or tabbed comparisons on narrow screens.
- System, light, and dark themes with readable code in each mode.
- Keyboard navigation, visible focus, semantic HTML, and sufficient contrast.
- Static pages, Server Components by default, and minimal browser JavaScript.

## MVP definition of done

A user can choose a technology pair, follow a roadmap, read a comparison with
code and mental-model guidance, explicitly complete a lesson, search the local
dictionary, browse a multi-framework comparison, read a recipe, bookmark
content, and retain local preferences after refreshing—all without a backend.
