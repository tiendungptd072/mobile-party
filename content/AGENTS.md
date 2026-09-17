# Content Instructions

These rules apply to educational content under `content/`.

## Goal

Help developers transfer knowledge between React Native, Flutter, Jetpack
Compose, and SwiftUI. Assume the reader already understands programming and
at least one supported framework.

## Structure

Use the shared schema in `docs/content-model.md`. Keep canonical slugs in
`kebab-case` and use the framework order defined there.

Long-form explanations belong in MDX. Small metadata and structured mappings
may use TypeScript when that representation is clearer.

## Comparisons

Examples must demonstrate equivalent behavior. Explicitly identify whether a
relationship is `equivalent`, `similar`, or `different`; never force a one-to-one
mapping when lifecycle, ownership, or runtime semantics differ.

Use these Shiki language identifiers:

```text
React Native     -> tsx
Flutter          -> dart
Jetpack Compose  -> kotlin
SwiftUI          -> swift
```

## Quality

- Keep examples minimal, valid, current, and idiomatic.
- Explain mental-model differences, not basic programming concepts.
- Do not duplicate educational content in UI components.
- Verify version-sensitive APIs before documenting them.
- Read only the target content and directly related entries for consistency.

## Localization

Educational content is published in English (`en`) and Vietnamese (`vi`).

- Keep slugs, framework IDs, code, API names, filenames, and code comments
  stable across locales.
- English is the source of truth for technical claims. Vietnamese must be a
  faithful, natural translation for developers, not a word-for-word rewrite.
- Preserve the same concept structure, relationship type, examples, mental
  model, common mistakes, and production notes in both locales.
- Retain established English technical terms when translating them would reduce
  clarity; explain them in Vietnamese prose when helpful.
- Review both locale variants when changing a concept.
