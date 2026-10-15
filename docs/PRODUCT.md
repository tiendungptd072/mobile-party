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

### Foundations extension (specified; implementation pending)

Foundations adds detailed knowledge articles about mobile runtimes, lifecycle,
state, concurrency, networking, storage, platform integration, security, quality,
and delivery. It complements the comparison modules with explanations of
mechanisms, constraints, failure cases, and tradeoffs.

Articles contain technical diagrams or illustrations, explanatory scenarios,
contextual source citations, and a reference list. Code is included where it
helps explain the mechanism. Readers do not select a framework pair or complete
exercises, quizzes, assignments, or progress requirements to read Foundations.

The initial scope is 48 articles organized into ten topics, as recorded in
[FOUNDATIONS-INVENTORY.md](FOUNDATIONS-INVENTORY.md). Specialist features are
separate editorial backlog items. The budget does not imply that articles have
already been written or that existing concepts cover every platform.

The index groups published articles by topic. The reader provides breadcrumbs,
a generated table of contents, figures with accessible explanations, citations,
references, and relevant links to articles and existing comparisons. Metadata
drives localized search and navigation. English and Vietnamese versions publish
together; drafts appear in neither public routes nor discovery. Locale switching
preserves the article slug and drops a locale-specific heading fragment.

This remains repository-backed, statically generated, and server-rendered. No
backend, account, CMS, native runtime, or browser diagram engine is required.
See the [content contract](content-model.md#foundations-articles-f02-contract) and
[editorial rules](CONTENT-GUIDE.md#53-foundations-articles).

F03 supplies the server-side content pipeline; F04 supplies the static locale index
and article reader, including localized metadata. The public registry remains
empty, so the index shows a localized empty state and unknown article slugs return 404. F05 authors the pilot, F06 adds quality reporting, and F07 adds navigation,
search, and sitemap discovery. Test fixtures are not published knowledge articles.

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

Planned Foundations routes use the existing canonical locale convention:

```text
/en/foundations
/vi/foundations
/en/foundations/[slug]
/vi/foundations/[slug]
```

The shared slug identifies an article, independently of platform or technology
pair. Unknown, draft, or unavailable article routes resolve as not found. Only
published paired-locale articles enter the sitemap, canonical/language-alternate
metadata, public topic index, and article search. Existing legacy routes and their
redirect behavior are outside this extension's scope.

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
