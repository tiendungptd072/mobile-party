# Coding Convention

This document defines coding standards for this project.

Tech stack:

* Next.js
* React
* TypeScript
* Tailwind CSS
* MDX
* Shiki
* Bun

The main goals are:

* readability
* consistency
* maintainability
* minimal complexity
* predictable project structure
* small client-side bundle

---

# 1. General Principles

Prefer code that is:

* simple
* explicit
* readable
* easy to delete
* easy to test
* easy to maintain

Avoid:

* premature abstraction
* clever one-liners
* unnecessary dependencies
* unnecessary state
* unnecessary client components
* unnecessary configuration

Follow existing project conventions before introducing new patterns.

---

# 2. File Naming

Use `kebab-case` for files.

Good:

```text
framework-tabs.tsx
code-block.tsx
concept-card.tsx
framework-config.ts
use-media-query.ts
```

Avoid:

```text
FrameworkTabs.tsx
frameworkTabs.tsx
framework_tabs.tsx
```

Exceptions:

Next.js special files must follow Next.js conventions:

```text
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
route.ts
```

MDX files should also use `kebab-case`.

```text
local-state.mdx
component-lifecycle.mdx
data-fetching.mdx
```

---

# 3. Folder Naming

Use `kebab-case`.

Good:

```text
components/
  code-block/
  framework-tabs/
```

Avoid deeply nested directories unless the feature requires it.

Prefer:

```text
components/
  ui/
  comparison/
  code/
```

over:

```text
components/
  shared/
    common/
      reusable/
        ui/
```

---

# 4. Variable Naming

Use `camelCase`.

```ts
const frameworkName = "React Native";
const activeFramework = "flutter";
const conceptList = [];
```

Boolean variables should clearly describe a boolean state.

Prefer:

```ts
const isOpen = true;
const isLoading = false;
const hasError = false;
const canNavigate = true;
const shouldRender = false;
```

Avoid:

```ts
const open = true;
const loading = false;
const error = false;
```

---

# 5. Function Naming

Use `camelCase`.

Functions should describe an action.

```ts
getConceptBySlug()
createCodeBlock()
formatFrameworkName()
loadConceptMetadata()
```

Event handlers should start with `handle`.

```ts
const handleFrameworkChange = () => {};
const handleSearch = () => {};
const handleClose = () => {};
```

Props containing callbacks should start with `on`.

```ts
type FrameworkTabsProps = {
  onChange: (framework: Framework) => void;
};
```

---

# 6. Component Naming

React components use `PascalCase`.

```tsx
function CodeBlock() {}

function FrameworkTabs() {}

function ConceptNavigation() {}
```

Component file names still use `kebab-case`.

```text
code-block.tsx
framework-tabs.tsx
concept-navigation.tsx
```

---

# 7. Constants

Use `UPPER_SNAKE_CASE` only for true application-level constants.

```ts
const SUPPORTED_FRAMEWORKS = [
  "react-native",
  "flutter",
  "kotlin",
  "swiftui",
] as const;

const DEFAULT_FRAMEWORK = "react-native";
```

Local immutable variables should remain camelCase.

Prefer:

```ts
const pageTitle = "State";
```

instead of:

```ts
const PAGE_TITLE = "State";
```

---

# 8. TypeScript

Use strict TypeScript.

Never use `any` unless there is no reasonable alternative.

Prefer:

```ts
function parseValue(value: unknown) {}
```

over:

```ts
function parseValue(value: any) {}
```

Prefer inferred types for obvious local values.

```ts
const count = 10;
const frameworks = ["flutter", "swiftui"];
```

Do not unnecessarily write:

```ts
const count: number = 10;
```

Use explicit types for:

* public function parameters
* component props
* domain models
* API boundaries
* complex return values

---

# 9. type vs interface

Use `type` by default.

```ts
type Framework = {
  id: string;
  name: string;
};
```

Use `interface` mainly when declaration merging or extensibility is intentionally required.

Do not mix `type` and `interface` arbitrarily.

---

# 10. Union Types

Prefer union types over magic strings.

Good:

```ts
type FrameworkId =
  | "react-native"
  | "flutter"
  | "kotlin"
  | "swiftui";
```

Avoid:

```ts
function selectFramework(framework: string) {}
```

Prefer:

```ts
function selectFramework(framework: FrameworkId) {}
```

---

# 11. Avoid Enums

Prefer literal unions or `as const`.

Prefer:

```ts
const FRAMEWORKS = [
  "react-native",
  "flutter",
  "kotlin",
  "swiftui",
] as const;

type FrameworkId = (typeof FRAMEWORKS)[number];
```

Avoid TypeScript `enum` unless there is a strong reason.

---

# 12. Null and Undefined

Prefer `undefined` for optional values.

```ts
type Concept = {
  description?: string;
};
```

Use `null` only when it represents an intentional empty state.

Do not mix `null` and `undefined` without reason.

---

# 13. Function Style

Prefer named functions for React components.

```tsx
export function CodeBlock() {
  return <div />;
}
```

For local callbacks, use arrow functions.

```ts
const handleClick = () => {
  //
};
```

Avoid:

```tsx
export const CodeBlock = () => {
  return <div />;
};
```

unless the surrounding project pattern uses it consistently.

---

# 14. Function Size

Functions should do one clear job.

Prefer:

```ts
getConcept()
formatConcept()
renderConcept()
```

over a single large function handling all responsibilities.

Do not split functions purely based on line count.

Extract logic when:

* it is reusable
* it has a distinct responsibility
* it improves readability
* it is independently testable

---

# 15. Early Returns

Prefer early returns to deep nesting.

Good:

```ts
function getFrameworkName(framework?: Framework) {
  if (!framework) {
    return "Unknown";
  }

  return framework.name;
}
```

Avoid:

```ts
function getFrameworkName(framework?: Framework) {
  if (framework) {
    return framework.name;
  } else {
    return "Unknown";
  }
}
```

---

# 16. React Components

Keep components focused.

A component should ideally have one main responsibility.

Prefer:

```text
ConceptPage
├── ConceptHeader
├── FrameworkTabs
├── FrameworkComparison
└── RelatedConcepts
```

instead of putting the entire page inside one component.

However, avoid excessive fragmentation into tiny one-use components.

---

# 17. Server Components

Use Server Components by default.

Do not add:

```tsx
"use client";
```

unless necessary.

Client Components are appropriate for:

* click handlers
* interactive tabs
* browser APIs
* local UI state
* client-only libraries

Keep client boundaries small.

Prefer:

```text
Server Page
  ↓
Server Content
  ↓
FrameworkTabs.client.tsx
```

instead of converting the entire page into a Client Component.

---

# 18. Client Component Naming

Normal components do not need `.server`.

For explicit client-only components, `.client.tsx` may be used when it improves clarity.

Example:

```text
framework-tabs.client.tsx
```

Do not add `.client` to every interactive component unless this pattern is used consistently.

---

# 19. Props

Create named prop types.

Good:

```tsx
type CodeBlockProps = {
  code: string;
  language: string;
};

export function CodeBlock({
  code,
  language,
}: CodeBlockProps) {
  // ...
}
```

Avoid inline prop types for non-trivial components.

```tsx
function CodeBlock({
  code,
}: {
  code: string;
}) {}
```

Small one-off components may use inline types when it remains clearer.

---

# 20. Props Naming

Boolean props should read naturally.

Good:

```tsx
<CodeBlock showLineNumbers />
<Sidebar isCollapsed />
```

Avoid:

```tsx
<Sidebar collapsed />
```

Callback props start with `on`.

```tsx
onChange
onClose
onSelect
onSearch
```

---

# 21. Destructuring

Destructure props in the function signature.

```tsx
export function ConceptCard({
  title,
  description,
}: ConceptCardProps) {
  // ...
}
```

Avoid unnecessary deep destructuring when it hurts readability.

---

# 22. React State

Use state only when the value changes over time and affects rendering.

Do not store derived values in state.

Avoid:

```tsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Prefer:

```tsx
const fullName = `${firstName} ${lastName}`;
```

---

# 23. useEffect

Do not use `useEffect` for:

* deriving values
* formatting data
* handling events
* synchronously transforming props

Use `useEffect` only when synchronizing with an external system.

Examples:

* browser APIs
* subscriptions
* timers
* third-party libraries

---

# 24. useMemo and useCallback

Do not add them by default.

Use them only when:

* there is measurable performance benefit
* reference stability is required
* a dependency explicitly needs it

Avoid premature memoization.

---

# 25. Conditional Rendering

Prefer simple conditions.

```tsx
{isLoading && <Loading />}
```

For mutually exclusive states:

```tsx
if (isLoading) {
  return <Loading />;
}

if (error) {
  return <ErrorState />;
}

return <Content />;
```

Avoid deeply nested ternaries.

---

# 26. Lists

Always use stable keys.

Good:

```tsx
concepts.map((concept) => (
  <ConceptCard
    key={concept.slug}
    concept={concept}
  />
));
```

Avoid using array indexes unless the list is static and cannot reorder.

---

# 27. Imports

Use this general order:

```ts
// React / Next.js
import Link from "next/link";

// External packages
import { codeToHtml } from "shiki";

// Internal modules
import { cn } from "@/lib/cn";

// Components
import { CodeBlock } from "@/components/code/code-block";

// Types
import type { Framework } from "@/types/framework";
```

Use `import type` for type-only imports.

```ts
import type { Metadata } from "next";
```

---

# 28. Import Paths

Prefer project aliases.

Good:

```ts
import { CodeBlock } from "@/components/code/code-block";
```

Avoid:

```ts
import { CodeBlock } from "../../../components/code/code-block";
```

Relative imports are acceptable for files within the same small module.

---

# 29. Exports

Prefer named exports.

Good:

```ts
export function CodeBlock() {}
```

Avoid default exports unless required by Next.js conventions.

Next.js files may use default export when required or conventional:

```tsx
export default function Page() {}
```

---

# 30. Barrel Files

Avoid excessive `index.ts` barrel files.

Import directly when practical.

Prefer:

```ts
import { CodeBlock } from "@/components/code/code-block";
```

over large barrel exports that hide dependencies.

---

# 31. Tailwind CSS

Use Tailwind utilities for styling.

Prefer:

```tsx
<div className="flex items-center gap-4 rounded-lg border p-4">
```

Do not use inline styles unless required for dynamic values that Tailwind cannot represent cleanly.

Avoid:

```tsx
<div
  style={{
    display: "flex",
    padding: "16px",
  }}
>
```

---

# 32. Tailwind Class Order

Use a consistent conceptual order:

```text
layout
position
size
spacing
typography
visual
interaction
responsive
```

Example:

```tsx
className="
  flex items-center
  w-full
  gap-4 p-4
  text-sm font-medium
  rounded-lg border bg-background
  hover:bg-muted
  md:p-6
"
```

Do not manually obsess over perfect class ordering when tooling already formats it.

---

# 33. Tailwind Arbitrary Values

Prefer existing Tailwind tokens.

Good:

```tsx
className="p-4 text-sm rounded-lg"
```

Avoid:

```tsx
className="p-[17px] text-[13px] rounded-[9px]"
```

Use arbitrary values only when the design genuinely requires them.

---

# 34. Responsive Design

Design mobile-first.

Prefer:

```tsx
className="grid grid-cols-1 gap-4 md:grid-cols-2"
```

Base styles should represent mobile behavior.

Add breakpoint overrides progressively.

---

# 35. className Composition

When conditional classes become non-trivial, use the existing `cn()` utility if available.

```tsx
className={cn(
  "rounded-lg border",
  isActive && "border-primary",
)}
```

Do not add `clsx`, `classnames`, or another package if an equivalent utility already exists.

---

# 36. Semantic HTML

Use semantic HTML whenever possible.

Prefer:

```html
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>
```

Use `<button>` for actions.

Use `<a>` or Next.js `<Link>` for navigation.

Do not make clickable `<div>` elements.

---

# 37. Accessibility

Interactive UI must support keyboard usage.

Buttons should have accessible labels when text is not visible.

Example:

```tsx
<button aria-label="Close menu">
  <CloseIcon />
</button>
```

Decorative icons should not be announced unnecessarily.

---

# 38. Images

Use Next.js `Image` when appropriate.

Always provide `alt`.

Meaningful image:

```tsx
<Image
  src={image}
  alt="React Native component hierarchy"
/>
```

Decorative image:

```tsx
<Image
  src={image}
  alt=""
/>
```

---

# 39. MDX Content

Educational content belongs in MDX, not React components.

Prefer:

```text
content/concepts/local-state.mdx
```

Do not hard-code long educational text inside:

```tsx
page.tsx
```

React should handle presentation.

MDX should handle educational content.

---

# 40. Shiki

Run syntax highlighting server-side whenever possible.

Do not ship the full Shiki highlighter to the browser without a clear reason.

Centralize Shiki configuration.

Prefer:

```text
src/lib/shiki.ts
```

instead of configuring Shiki independently in multiple components.

---

# 41. Errors

Do not silently ignore errors.

Avoid:

```ts
try {
  await loadContent();
} catch {}
```

Handle or propagate errors intentionally.

```ts
try {
  return await loadContent();
} catch (error) {
  console.error("Failed to load concept", error);
  throw error;
}
```

---

# 42. Comments

Comments explain why, not what.

Avoid:

```ts
// Get concept
const concept = getConcept();
```

Prefer:

```ts
// Load content at build time so concept pages remain fully static.
const concept = await getConcept(slug);
```

Do not comment obvious code.

---

# 43. TODO Comments

TODOs must contain actionable information.

Good:

```ts
// TODO: Replace this mapping when framework aliases are moved into content metadata.
```

Avoid:

```ts
// TODO: fix later
```

---

# 44. Dependency Rules

Before adding a dependency:

1. check existing dependencies
2. check native browser functionality
3. check React / Next.js functionality
4. determine whether a small utility is sufficient

Do not install a package for trivial functionality.

Use Bun only.

```bash
bun add package-name
```

Development dependency:

```bash
bun add -d package-name
```

---

# 45. Async Code

Prefer `async/await`.

Good:

```ts
const concept = await getConcept(slug);
```

Avoid unnecessary promise chains.

```ts
getConcept(slug)
  .then(...)
  .then(...)
  .catch(...);
```

Parallel independent operations should use:

```ts
const [concept, navigation] = await Promise.all([
  getConcept(slug),
  getNavigation(),
]);
```

---

# 46. Magic Values

Avoid unexplained magic values.

Bad:

```ts
if (items.length > 4) {}
```

Better:

```ts
const MAX_VISIBLE_FRAMEWORKS = 4;

if (items.length > MAX_VISIBLE_FRAMEWORKS) {}
```

Do not create constants for obvious trivial values.

---

# 47. Data Mutability

Prefer immutable operations.

Good:

```ts
const sortedConcepts = [...concepts].sort(compareConcepts);
```

Avoid unexpected mutation of shared data.

---

# 48. Search and Filtering

For the initial static project, prefer client-side filtering for small datasets.

Do not introduce:

* backend search
* database search
* search service

unless the dataset actually requires it.

---

# 49. Code Duplication

Small duplication is acceptable when abstraction would make the code harder to understand.

Extract shared logic when:

* it appears repeatedly
* it represents the same concept
* changes should stay synchronized

Do not create an abstraction based on one occurrence.

---

# 50. Validation Before Completion

After implementation:

1. check TypeScript errors
2. run lint
3. run relevant tests if available
4. run build for significant changes

Typical commands:

```bash
bun lint
```

```bash
bun build
```

Do not modify unrelated code just to make unrelated checks pass.

---

# 51. Git-Friendly Changes

Keep diffs focused.

Do not:

* reformat unrelated files
* reorder unrelated imports
* rename unrelated variables
* rewrite working code

A task should produce the smallest meaningful diff.

---

# 52. Preferred Code Style

Prefer:

```ts
function getFrameworkById(
  frameworks: Framework[],
  id: FrameworkId,
) {
  return frameworks.find(
    (framework) => framework.id === id,
  );
}
```

over compressed code:

```ts
const getFrameworkById = (f: Framework[], id: FrameworkId) =>
  f.find((x) => x.id === id);
```

Clarity is more important than minimizing lines.

---

# 53. Decision Priority

When multiple solutions are possible, prioritize in this order:

1. existing project pattern
2. simplest implementation
3. Next.js native capability
4. React native capability
5. browser native capability
6. small local utility
7. external dependency

---

# 54. Final Rule

Code should make another developer think:

> "I can understand this without needing the original author to explain it."

Prefer boring, predictable code over clever code.
# Professional Commenting Convention

Comments in this project should follow the standard expected from a well-maintained library or SDK.

The goal of comments is not to describe syntax.

Comments should explain:

* API purpose
* behavior
* assumptions
* constraints
* side effects
* edge cases
* design decisions
* non-obvious implementation details

Code should remain understandable without excessive comments.

---

# 55. Comment Philosophy

Do not comment what the code obviously does.

Bad:

```ts
// Get concept by slug
const concept = getConceptBySlug(slug);
```

Bad:

```ts
// Loop through frameworks
frameworks.map(...)
```

Bad:

```ts
// Set loading to true
setLoading(true);
```

Comments should provide information that cannot be immediately understood from the code.

Good:

```ts
// Resolve aliases before lookup so legacy MDX links remain valid
// after a concept slug is renamed.
const resolvedSlug = resolveConceptAlias(slug);
```

Good:

```ts
// Highlight on the server to avoid shipping Shiki and its grammars
// to the client bundle.
const html = await highlightCode(code, language);
```

---

# 56. Public API Documentation

Public functions, components, hooks, types, utilities, and configuration should use TSDoc-style documentation when their behavior is not trivial.

Use:

```ts
/**
 * Loads a concept using its canonical slug.
 *
 * Returns `undefined` when the concept does not exist.
 */
export function getConceptBySlug(
  slug: string,
): Concept | undefined {
  // ...
}
```

Documentation should describe the contract of the API rather than its implementation.

---

# 57. Function Documentation

For important reusable functions, document:

1. purpose
2. important behavior
3. parameters when not obvious
4. return value when meaningful
5. side effects
6. exceptions or failure conditions
7. special constraints

Example:

```ts
/**
 * Resolves a concept from its URL slug.
 *
 * Legacy aliases are normalized before lookup so old links continue
 * to work after a concept is renamed.
 *
 * @param slug - Concept slug received from the route.
 * @returns The matching concept, or `undefined` when no concept exists.
 */
export function getConceptBySlug(
  slug: string,
): Concept | undefined {
  const canonicalSlug = resolveConceptAlias(slug);

  return concepts.find(
    (concept) => concept.slug === canonicalSlug,
  );
}
```

Do not add `@param` or `@returns` when they only repeat obvious TypeScript information.

Avoid:

```ts
/**
 * @param slug - The slug.
 * @returns Concept.
 */
```

Prefer documentation that adds context.

---

# 58. Component Documentation

Reusable UI components should document their responsibility and important behavior.

Example:

```tsx
/**
 * Renders source code with server-side syntax highlighting.
 *
 * The component intentionally performs highlighting on the server so
 * Shiki and its language grammars are not included in the browser bundle.
 */
export async function CodeBlock({
  code,
  language,
}: CodeBlockProps) {
  // ...
}
```

Do not document basic presentation components unless the component has a meaningful contract.

This usually does not need documentation:

```tsx
export function Divider() {
  return <hr className="border-border" />;
}
```

---

# 59. Props Documentation

Document individual props only when their meaning, constraints, or behavior are not obvious.

Example:

```ts
type CodeBlockProps = {
  /** Raw source code before syntax highlighting. */
  code: string;

  /**
   * Shiki language identifier.
   *
   * Examples: `tsx`, `dart`, `kotlin`, `swift`.
   */
  language: SupportedLanguage;

  /**
   * Highlights specific source lines.
   *
   * Line numbers are one-based to match editor conventions.
   */
  highlightedLines?: readonly number[];
};
```

Avoid comments such as:

```ts
type Props = {
  /** Title */
  title: string;

  /** Whether it is active */
  isActive: boolean;
};
```

The type and property name already explain those values.

---

# 60. Type Documentation

Domain models should document semantic meaning, not basic TypeScript syntax.

Example:

```ts
/**
 * Frameworks supported by concept comparisons.
 *
 * The identifier is persisted in URLs and MDX metadata,
 * so existing values must not be renamed without migration.
 */
export type FrameworkId =
  | "react-native"
  | "flutter"
  | "kotlin"
  | "swiftui";
```

This is useful because it documents a constraint that cannot be inferred from the union itself.

---

# 61. Configuration Documentation

Configuration should explain why values exist and what assumptions depend on them.

Example:

```ts
/**
 * Framework display order used throughout comparison pages.
 *
 * Keep this order stable because MDX content and responsive layouts
 * assume React Native is the first reference framework.
 */
export const FRAMEWORKS = [
  // ...
] as const;
```

---

# 62. Internal Implementation Comments

Inside functions, use short comments for non-obvious implementation decisions.

Good:

```ts
// Normalize line endings before hashing so the same example produces
// an identical cache key on Windows and Unix systems.
const normalizedCode = code.replace(/\r\n/g, "\n");
```

Good:

```ts
// Shiki throws when an unknown language is requested. Falling back to
// plain text keeps malformed MDX content renderable in production.
const language = isSupportedLanguage(lang)
  ? lang
  : "text";
```

Bad:

```ts
// Replace Windows line endings
const normalizedCode = code.replace(/\r\n/g, "\n");
```

The code already says that.

---

# 63. Explain Why, Not What

Prefer:

```ts
// Keep the selected framework in the URL so comparisons can be shared
// without introducing global application state.
const framework = searchParams.get("framework");
```

Avoid:

```ts
// Get framework from URL.
const framework = searchParams.get("framework");
```

---

# 64. Design Decision Comments

When code intentionally chooses one approach over another, document the reason.

Example:

```ts
// This intentionally remains a server utility instead of a route handler.
// Concept metadata is static and can be resolved during build time.
export async function getConcepts() {
  // ...
}
```

These comments are especially valuable because future developers may otherwise "simplify" the code and accidentally remove an intentional design choice.

---

# 65. Constraint Comments

Document constraints imposed by frameworks, third-party packages, browsers, or project architecture.

Example:

```ts
// `generateStaticParams` requires plain serializable values.
// Do not return the full concept metadata object here.
export function generateStaticParams() {
  return concepts.map(({ slug }) => ({ slug }));
}
```

---

# 66. Workaround Comments

Workarounds must explain:

1. the underlying issue
2. why the workaround exists
3. when it may be removed

Example:

```ts
// Workaround for Shiki language aliases not matching our MDX metadata.
// Remove this mapping when content metadata is migrated to canonical
// Shiki language identifiers.
const LANGUAGE_ALIASES = {
  ts: "typescript",
  js: "javascript",
} as const;
```

Avoid:

```ts
// Hack
```

or:

```ts
// Temporary fix
```

without context.

---

# 67. TODO Convention

TODO comments must be actionable.

Format:

```ts
// TODO: <specific action and reason>
```

Good:

```ts
// TODO: Remove this fallback after all legacy `compose` language
// identifiers are migrated to `kotlin`.
```

Good:

```ts
// TODO: Move framework metadata into MDX frontmatter once the content
// loader supports schema validation.
```

Avoid:

```ts
// TODO
```

```ts
// TODO: fix
```

```ts
// TODO: clean this later
```

---

# 68. FIXME Convention

Use `FIXME` only for known incorrect behavior that cannot be fixed immediately.

Example:

```ts
// FIXME: This assumes every concept has exactly four framework examples.
// Support optional framework implementations before adding web platforms.
```

Do not use `FIXME` for ordinary future improvements.

---

# 69. Warning Comments

Use `WARNING` sparingly for behavior that is easy to break and has significant consequences.

Example:

```ts
// WARNING: These identifiers are part of public URLs.
// Renaming them requires redirects for existing concept links.
export const FRAMEWORK_IDS = [
  // ...
] as const;
```

Do not overuse warning comments.

---

# 70. Example Documentation

Reusable library-like APIs may include `@example` when correct usage is not immediately obvious.

Example:

````ts
/**
 * Creates the canonical URL for a concept comparison.
 *
 * @example
 * ```ts
 * getConceptUrl("local-state", "flutter");
 * // "/concepts/local-state?framework=flutter"
 * ```
 */
export function getConceptUrl(
  slug: string,
  framework?: FrameworkId,
) {
  // ...
}
````

Use examples only when they improve understanding.

Do not add examples to every helper.

---

# 71. Error Documentation

Document thrown errors when callers are expected to handle them.

Example:

```ts
/**
 * Parses concept frontmatter.
 *
 * @throws {InvalidConceptMetadataError}
 * When required metadata is missing or malformed.
 */
export function parseConceptMetadata(
  value: unknown,
): ConceptMetadata {
  // ...
}
```

Do not document internal errors callers cannot meaningfully handle.

---

# 72. Side Effects

Functions with important side effects should state them explicitly.

Example:

```ts
/**
 * Registers a language with the shared Shiki highlighter.
 *
 * Mutates the process-wide highlighter instance and should only be
 * called during server initialization.
 */
export async function registerLanguage(
  language: BundledLanguage,
) {
  // ...
}
```

---

# 73. Deprecation

Deprecated public APIs must use `@deprecated`.

Example:

```ts
/**
 * @deprecated Use `getConceptBySlug` instead.
 *
 * This alias exists only for compatibility with early content loaders
 * and will be removed after migration.
 */
export const findConcept = getConceptBySlug;
```

Where useful, explain the replacement.

---

# 74. Comments for Algorithms

For algorithms or transformations that are difficult to understand, explain the strategy before the implementation.

Example:

```ts
/**
 * Creates comparison rows from framework examples.
 *
 * Examples are grouped by their semantic step rather than source line
 * number because equivalent implementations often require different
 * numbers of lines across frameworks.
 */
function createComparisonRows(
  examples: FrameworkExample[],
) {
  // ...
}
```

Avoid commenting every line of the algorithm.

---

# 75. Comment Placement

Place documentation immediately above the symbol it describes.

Good:

```ts
/**
 * Returns all published concepts.
 */
export function getConcepts() {}
```

Avoid detached comments:

```ts
/**
 * Returns all published concepts.
 */

// unrelated code

export function getConcepts() {}
```

Inline comments should appear immediately before the relevant logic.

---

# 76. Comment Length

Prefer concise documentation.

A normal API comment should usually be:

* 1–3 sentences
* a short paragraph when additional context is needed

Do not write essays inside source files.

Move extensive architecture explanations to:

```text
docs/
```

Then reference the relevant design decision from code only when necessary.

---

# 77. Comment Language

All source-code comments and API documentation must be written in clear technical English.

Prefer simple English.

Good:

```ts
// Keep highlighting on the server to avoid increasing the client bundle.
```

Avoid overly formal or vague language:

```ts
// This particular implementation has been deliberately facilitated
// in this manner for the purposes of performance optimization.
```

---

# 78. Documentation Style

Use complete sentences for TSDoc/JSDoc.

```ts
/**
 * Returns the concept matching the provided slug.
 */
```

Short internal comments may omit a full sentence when appropriate, but clarity is more important than brevity.

---

# 79. Comments Must Stay Correct

Outdated comments are worse than missing comments.

Whenever behavior changes:

* update related API documentation
* update examples
* update constraint comments
* remove obsolete workaround comments

Never leave comments describing behavior that no longer exists.

---

# 80. Public vs Private Documentation

Use stronger documentation for code that forms part of a reusable contract.

High documentation priority:

```text
public components
public hooks
shared utilities
domain types
configuration
content loaders
parsers
framework adapters
Shiki utilities
```

Lower documentation priority:

```text
small local helpers
obvious JSX
simple event handlers
trivial local transformations
```

---

# 81. Library-Quality Example

Preferred:

````ts
/**
 * Converts a framework identifier from content metadata into the
 * canonical identifier used by the application.
 *
 * Unknown identifiers return `undefined` instead of throwing because
 * content validation is handled separately during the build process.
 *
 * @param value - Framework identifier read from MDX frontmatter.
 * @returns The canonical framework identifier when supported.
 *
 * @example
 * ```ts
 * normalizeFrameworkId("compose");
 * // "kotlin"
 * ```
 */
export function normalizeFrameworkId(
  value: string,
): FrameworkId | undefined {
  return FRAMEWORK_ALIASES[value];
}
````

Avoid:

```ts
// Normalize framework
export function normalizeFrameworkId(value: string) {
  return FRAMEWORK_ALIASES[value];
}
```

---

# 82. Component Library Example

Preferred:

```tsx
type FrameworkTabsProps = {
  /**
   * Currently selected framework.
   *
   * The value should normally come from the URL so a comparison state
   * can be shared through a direct link.
   */
  value: FrameworkId;

  /**
   * Called when the user selects another framework.
   */
  onValueChange: (value: FrameworkId) => void;
};

/**
 * Allows users to switch between framework implementations on
 * narrow screens where side-by-side comparison is not practical.
 */
export function FrameworkTabs({
  value,
  onValueChange,
}: FrameworkTabsProps) {
  // ...
}
```

This is the preferred style for reusable components.

---

# 83. Hook Documentation Example

```ts
/**
 * Tracks whether the given media query currently matches.
 *
 * The initial server value is `false` because `matchMedia` is only
 * available in the browser.
 *
 * @param query - A valid CSS media query.
 */
export function useMediaQuery(
  query: string,
): boolean {
  // ...
}
```

The documentation explains both behavior and an important server-rendering constraint.

---

# 84. Do Not Over-Document

Do not turn this:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

into:

```ts
/**
 * Takes class values.
 * Combines the class values.
 * Merges Tailwind classes.
 * Returns the classes.
 */
```

Documentation must add value.

---

# 85. Comment Decision Rule

Before writing a comment, ask:

```text
Would a competent developer understand this from the code alone?
```

If yes:

Do not comment.

If no, ask:

```text
What information is missing?
```

Comment the missing:

* reason
* contract
* constraint
* trade-off
* behavior
* edge case

Never comment purely to increase documentation density.
