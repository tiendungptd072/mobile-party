# Content Guide

This document defines how educational content should be written for this project.

The website helps developers transfer knowledge between:

- React Native
- Flutter
- Kotlin / Jetpack Compose
- Swift / SwiftUI

The reader is assumed to already understand programming and at least one of the supported frameworks.

The goal is not to teach programming from zero.

The goal is to answer:

> "I already know how this concept works in one framework. How does the equivalent concept work in the others?"

---

# 1. Content Principles

Every concept should be:

- concise
- technically accurate
- easy to compare
- behaviorally equivalent across frameworks
- focused on the mental model
- free from unnecessary boilerplate

Prefer:

```text
shared concept
→ equivalent APIs
→ code comparison
→ important differences
→ mental model
```

Avoid:

```text
long beginner tutorials
framework history
unrelated setup
large sample applications
marketing language
framework wars
```

---

# 2. Audience

Assume the reader:

- understands basic programming
- understands components / UI concepts
- already knows at least one supported framework
- wants to learn another framework through comparison

Do not explain basic programming concepts such as:

- variables
- functions
- classes
- loops
- conditionals

unless the concept specifically depends on a language-level difference.

---

# 3. Supported Frameworks

Use these canonical names:

```text
React Native
Flutter
Jetpack Compose
SwiftUI
```

Canonical identifiers:

```text
react-native
flutter
kotlin
swiftui
```

Do not use inconsistent labels such as:

```text
Kotlin UI
Android Compose
Swift UI
RN
```

unless they appear naturally inside explanatory prose.

---

# 4. Default Framework Order

Unless there is a strong reason to do otherwise, use this order:

1. React Native
2. Flutter
3. Jetpack Compose
4. SwiftUI

Keep the order stable across the site.

---

# 5. Concept File Naming

Use `kebab-case`.

Examples:

```text
component.mdx
local-state.mdx
derived-state.mdx
side-effects.mdx
conditional-rendering.mdx
list-rendering.mdx
navigation-stack.mdx
```

The file name should normally match the canonical slug.

Example:

```text
content/concepts/local-state.mdx
```

```yaml
slug: local-state
```

---

# 6. Frontmatter

Each concept should use a consistent metadata structure.

Recommended minimum:

```yaml
---
title: Local State
slug: local-state
description: Compare local state across React Native, Flutter, Jetpack Compose, and SwiftUI.
category: state
order: 10
---
```

Optional fields may include:

```yaml
difficulty: basic
keywords:
  - state
  - useState
  - remember
  - State
  - StatefulWidget
related:
  - derived-state
  - shared-state
---
```

Do not invent new frontmatter fields without updating the content schema.

---

# 7. Supported Categories

Use one of the supported categories:

```text
fundamentals
state
lifecycle
interaction
lists
navigation
async
architecture
```

Do not create near-duplicate categories such as:

```text
states
state-management
state-management-basic
```

unless the product taxonomy is intentionally updated.

---

# 8. Difficulty

If difficulty is used, use:

```text
basic
intermediate
advanced
```

Difficulty should reflect conceptual complexity, not code length.

---

# 9. Default Concept Structure

Use this structure unless the topic requires a different layout:

```md
---
frontmatter
---

# Concept Title

Short shared explanation.

## Quick Mapping

A concise framework mapping.

## React Native

Short explanation.

Code example.

## Flutter

Short explanation.

Code example.

## Jetpack Compose

Short explanation.

Code example.

## SwiftUI

Short explanation.

Code example.

## Key Differences

Important semantic differences.

## Mental Model

How a developer should translate the concept between frameworks.

## Related Concepts

Links to related topics.
```

Do not mechanically add empty sections.

---

# 10. Concept Introduction

The introduction should explain the shared concept once.

Target length:

```text
1–3 short paragraphs
```

Explain:

- what the concept represents
- why it exists
- what the reader should compare

Do not repeat the same conceptual explanation in all four framework sections.

Example:

```md
Local state represents data owned by a UI component or view and used to
control its rendering.

All four frameworks provide a way to keep state close to the UI, but they
differ in how state is declared, observed, and preserved across renders.
```

---

# 11. Quick Mapping

For concepts with clear equivalents, include a short mapping.

Example:

```text
React Native       → useState
Flutter            → State / StatefulWidget
Jetpack Compose    → remember + mutableStateOf
SwiftUI            → @State
```

The mapping is a navigation aid, not the full explanation.

Do not force one-to-one mappings when the concepts are not truly equivalent.

If there is no direct equivalent, say so explicitly.

Example:

```text
There is no exact one-to-one equivalent.
```

Then explain the nearest mental model.

---

# 12. Framework Sections

Each framework section should focus on:

1. the idiomatic implementation
2. the ownership model
3. the relevant API
4. any important lifecycle behavior
5. differences that matter when transferring knowledge

Keep each section concise.

Avoid repeating shared explanations.

---

# 13. Equivalent Behavior

Examples across frameworks must demonstrate the same behavior.

For example, a local state comparison should not show:

```text
React Native       → counter
Flutter            → form
Jetpack Compose    → network request
SwiftUI            → navigation
```

Instead, all four examples should implement the same small behavior.

Preferred example:

```text
tap button
→ increment counter
→ UI updates
```

This makes syntax and mental-model differences visible.

---

# 14. Minimal Examples

Code should show only what is needed to understand the concept.

Avoid unrelated:

- app bootstrap
- routing
- networking
- dependency injection
- styling
- package setup
- production configuration

unless the concept specifically requires them.

Prefer:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button
      title={`Count: ${count}`}
      onPress={() => setCount((value) => value + 1)}
    />
  );
}
```

over a full application file.

---

# 15. Code Correctness

Examples must be valid for the intended framework and current project documentation assumptions.

Do not:

- invent APIs
- mix framework versions
- combine legacy and modern patterns without explanation
- use deprecated APIs without clearly marking them

If an API is version-sensitive, verify before documenting it.

---

# 16. Idiomatic Code

Examples should use the idiomatic approach for each framework.

Do not artificially make one framework look like another.

For example:

- React Native should look like React.
- Flutter should use normal widget patterns.
- Jetpack Compose should use Compose state and composition.
- SwiftUI should use SwiftUI property wrappers and view composition.

The goal is conceptual equivalence, not syntactic imitation.

---

# 17. Code Length

Prefer code examples that fit comfortably on screen.

Typical target:

```text
5–25 lines
```

Longer examples are acceptable only when necessary.

If an example becomes large:

1. remove unrelated code
2. split into smaller focused examples
3. explain the concept in stages

Do not hide important behavior merely to meet a line limit.

---

# 18. Imports

Include imports only when they help comprehension.

For very common APIs, imports may be omitted if the context is obvious.

If imports are important to understand where an API comes from, include them.

Be consistent within the same concept.

---

# 19. Shiki Language Identifiers

Use the correct code-fence language:

```text
React Native       → tsx
Flutter            → dart
Jetpack Compose    → kotlin
SwiftUI            → swift
```

Examples:

````md
```tsx
// React Native
```

```dart
// Flutter
```

```kotlin
// Jetpack Compose
```

```swift
// SwiftUI
```
````

Do not use generic `text` for source code when a supported language exists.

---

# 20. Explanations Around Code

Do not narrate every line.

Bad:

```text
First, we create a variable called count.
Then, we create a button.
Then, we increment count.
```

Prefer:

```text
`useState` stores state between renders. Updating the state schedules a
new render with the latest value.
```

Focus on behavior and mental model.

---

# 21. Key Differences

The `Key Differences` section should contain meaningful distinctions.

Good topics:

- state ownership
- persistence across renders
- lifecycle
- mutation model
- recomposition / rendering
- binding
- asynchronous behavior
- navigation ownership
- dependency lifetime

Avoid trivial comparisons such as:

```text
React Native uses TypeScript.
Flutter uses Dart.
```

unless the language difference materially affects the concept.

---

# 22. Mental Model

This is one of the most important sections.

Translate the concept from one framework mindset to another.

Example:

```text
If you come from React Native, think of Compose `remember` as local
composition state, but do not treat recomposition as identical to a React
component render. The frameworks have similar goals but different runtime
models.
```

Mental-model guidance should:

- reduce incorrect assumptions
- explain where analogies stop working
- highlight architectural differences

---

# 23. Avoid False Equivalence

Do not force APIs into one-to-one mappings when their semantics differ.

Example:

```text
useEffect ≠ LaunchedEffect in every situation
```

It is acceptable to say:

```text
The nearest equivalent is...
```

or:

```text
These APIs solve overlapping problems but have different lifecycle semantics.
```

Accuracy is more important than a neat comparison table.

---

# 24. Comparison Tables

Use tables for concise semantic comparison.

Example:

```md
| Framework | Local state API | State owner |
| --- | --- | --- |
| React Native | `useState` | Component |
| Flutter | `State` | `StatefulWidget` state object |
| Jetpack Compose | `remember` + `mutableStateOf` | Composition |
| SwiftUI | `@State` | View-managed state storage |
```

Do not put large code samples inside tables.

Use dedicated code blocks instead.

---

# 25. Terminology

Use consistent technical terminology.

Preferred terms:

```text
component
widget
view
state
render
recomposition
lifecycle
side effect
navigation
binding
observable state
```

Use the framework's native terminology when discussing framework-specific behavior.

Do not rename core framework concepts just to make them match another framework.

---

# 26. React Native Content

For React Native:

- use modern React patterns
- prefer functional components
- prefer hooks
- use TypeScript examples where practical
- avoid class components unless the concept specifically discusses them

Do not present web DOM APIs as React Native APIs.

---

# 27. Flutter Content

For Flutter:

- use idiomatic Dart
- use current widget patterns
- distinguish stateless and stateful ownership clearly
- explain `BuildContext` only when relevant
- avoid unrelated architecture packages in basic examples

Do not introduce Riverpod, Bloc, Provider, or similar libraries unless the concept specifically covers state-management libraries.

---

# 28. Jetpack Compose Content

For Jetpack Compose:

- use Compose-native APIs
- distinguish `remember` from durable persistence where relevant
- explain recomposition when it materially affects the concept
- avoid XML-based Android UI unless the topic explicitly compares old and new UI systems

Use Kotlin that is idiomatic and concise.

---

# 29. SwiftUI Content

For SwiftUI:

- use modern SwiftUI patterns
- use the appropriate property wrapper
- explain ownership differences between `@State`, bindings, and observable models when relevant
- avoid UIKit unless the topic explicitly compares the two systems

Keep examples focused on SwiftUI.

---

# 30. Version-Sensitive Content

If framework behavior depends strongly on version:

1. verify the relevant API
2. avoid presenting unstable behavior as universal
3. mention the important version constraint only when necessary

Do not clutter every concept with version history.

---

# 31. Legacy APIs

Do not teach legacy APIs as the default.

Legacy APIs may appear when:

- migration is the topic
- the old API is still common in real projects
- understanding it helps explain modern behavior

Clearly label legacy code.

---

# 32. External Libraries

Do not introduce third-party packages in fundamental concepts unless required.

Prefer native framework capabilities.

For example, do not use:

```text
Redux
Zustand
Riverpod
Bloc
Koin
Hilt
Combine extensions
```

inside a basic local-state topic.

Those belong in dedicated concepts.

---

# 33. Content Depth

Use progressive depth.

A concept should first answer:

```text
What is the equivalent?
```

Then:

```text
How is it used?
```

Then:

```text
What is different?
```

Then, when relevant:

```text
What assumption from my current framework would be wrong here?
```

Do not begin with deep internals unless the concept is explicitly advanced.

---

# 34. Basic Concepts

Basic concepts should be short and comparison-oriented.

Examples:

```text
Text
Button
Image
Local State
Conditional Rendering
List Rendering
Input
```

Avoid turning them into full tutorials.

---

# 35. Intermediate Concepts

Intermediate topics may include:

```text
Side Effects
Lifecycle
Navigation
Shared State
Async Data
Forms
Error Handling
```

Explain lifecycle and ownership differences more carefully.

---

# 36. Advanced Concepts

Advanced topics may include:

```text
Rendering model
Recomposition
State restoration
Dependency injection
Performance
Architecture
Concurrency
Navigation architecture
```

These may require longer explanations and diagrams.

Do not oversimplify advanced concepts merely to keep all articles identical in length.

---

# 37. Related Concepts

Use canonical slugs.

Example:

```text
local-state
derived-state
shared-state
side-effects
```

Related links should be genuinely useful.

Do not add links purely to increase navigation density.

---

# 38. Search Keywords

Keywords should improve discoverability.

Include common cross-framework terminology where useful.

Example:

```yaml
keywords:
  - local state
  - useState
  - StatefulWidget
  - mutableStateOf
  - remember
  - @State
```

Do not add dozens of loosely related keywords.

---

# 39. Titles

Titles should use clear concept names.

Good:

```text
Local State
Conditional Rendering
Side Effects
List Rendering
Stack Navigation
```

Avoid vague marketing-style titles:

```text
Master State Like a Pro
The Ultimate Guide to UI
Everything About Effects
```

---

# 40. Descriptions

Descriptions should explain the learning goal in one sentence.

Good:

```text
Compare local UI state across React Native, Flutter, Jetpack Compose,
and SwiftUI.
```

Avoid descriptions that simply repeat the title.

---

# 41. Tone

Use a technical, neutral, direct tone.

Prefer:

```text
SwiftUI uses `@State` for view-owned local state.
```

Avoid:

```text
SwiftUI makes state management incredibly easy and elegant.
```

Do not promote or criticize frameworks.

---

# 42. No Framework Ranking

Do not describe frameworks as:

- best
- worst
- superior
- inferior
- easier overall
- more professional

You may describe concrete trade-offs.

Example:

```text
This approach requires more explicit lifecycle ownership.
```

is acceptable.

---

# 43. Comments Inside Code Examples

Keep comments minimal.

Use comments only when they help explain behavior that is not obvious.

Good:

```ts
// Use the functional updater when the next value depends on the previous state.
setCount((value) => value + 1);
```

Avoid:

```ts
// Increment count.
setCount(count + 1);
```

Examples should follow the project's professional comment convention.

---

# 44. Example Naming

Use neutral, repeated example domains to make comparison easier.

Preferred small examples:

```text
Counter
Toggle
Search field
Todo item
User profile
Loading state
Simple list
```

When possible, use the same scenario across framework sections.

---

# 45. Do Not Overload Examples

Each example should teach one main concept.

Do not combine:

```text
navigation
API calls
global state
animation
form validation
```

into a local-state example.

Create separate concepts instead.

---

# 46. Diagrams

Use diagrams when they improve understanding of architecture or lifecycle.

Good uses:

```text
render flow
state ownership
navigation hierarchy
data flow
lifecycle sequence
```

Do not add diagrams when a short paragraph communicates the idea more clearly.

---

# 47. Content Duplication

Shared explanations belong in the concept introduction.

Framework sections should contain framework-specific information.

Avoid repeating the same sentence four times with only the framework name changed.

---

# 48. Content Validation

Before considering a concept complete, verify:

1. frontmatter matches the schema
2. slug matches file naming
3. all required frameworks are represented when applicable
4. examples implement equivalent behavior
5. syntax identifiers are correct
6. code is plausible and idiomatic
7. no deprecated API is accidentally presented as current
8. key differences are meaningful
9. related concepts use canonical slugs

---

# 49. Missing Framework Equivalent

Some concepts may not have a meaningful equivalent in every framework.

Do not invent one.

Use wording such as:

```text
No direct equivalent
```

Then explain:

- why the concept is framework-specific
- what developers normally use instead
- whether the mental model exists at another layer

---

# 50. Concept Template

Use this as the default starting point:

````md
---
title: Local State
slug: local-state
description: Compare local UI state across React Native, Flutter, Jetpack Compose, and SwiftUI.
category: state
order: 10
difficulty: basic
keywords:
  - local state
  - useState
  - StatefulWidget
  - remember
  - mutableStateOf
  - "@State"
related:
  - derived-state
  - shared-state
---

# Local State

Local state is data owned by a UI unit and used to control what that UI renders.

All four frameworks support state close to the UI, but they differ in how
that state is declared, observed, and preserved.

## Quick Mapping

| Framework | Common local-state approach |
| --- | --- |
| React Native | `useState` |
| Flutter | `State` in a `StatefulWidget` |
| Jetpack Compose | `remember` + `mutableStateOf` |
| SwiftUI | `@State` |

## React Native

React Native follows the React state model. `useState` stores state for a
component instance and schedules a render when the value changes.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button
      title={`Count: ${count}`}
      onPress={() => setCount((value) => value + 1)}
    />
  );
}
```

## Flutter

Flutter usually stores mutable local widget state inside the `State` object
associated with a `StatefulWidget`.

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => count++),
      child: Text('Count: $count'),
    );
  }
}
```

## Jetpack Compose

Compose can retain local state across recompositions with `remember`.

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

## SwiftUI

SwiftUI uses `@State` for state owned by a view.

```swift
struct Counter: View {
    @State private var count = 0

    var body: some View {
        Button("Count: \(count)") {
            count += 1
        }
    }
}
```

## Key Differences

- React Native keeps local state through React hooks.
- Flutter separates immutable widget configuration from mutable `State`.
- Compose stores state that can survive recomposition using `remember`.
- SwiftUI uses property wrappers to declare view-owned state.

## Mental Model

The common idea is the same: changing local state causes the UI to be
evaluated again.

However, React rendering, Flutter rebuilds, Compose recomposition, and SwiftUI
view updates are not identical runtime mechanisms. Treat them as comparable
mental models rather than exact implementations.

## Related Concepts

- Derived State
- Shared State
- Side Effects
````

---

# 51. Agent Writing Rules

When Codex creates or edits content:

1. read the target concept first
2. read only directly related concepts if needed for consistency
3. follow this guide
4. preserve existing terminology
5. avoid rewriting unrelated content
6. do not expand the article beyond the requested scope
7. do not add new dependencies for content work
8. verify framework APIs when uncertain

For a small content edit, do not scan the entire `content/` directory.

---

# 52. Final Rule

Every concept should allow a reader to quickly answer:

```text
I know this in framework A.
What is the equivalent mental model and implementation in framework B?
```

If the article does not make that comparison easier, simplify or restructure it.
