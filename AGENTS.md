<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Project Instructions
Purpose

This repository contains an educational comparison website inspired by component-party.dev.

It helps developers transfer knowledge between:

React Native
Flutter
Kotlin / Jetpack Compose
Swift / SwiftUI

Keep the project:

content-first
static-first
server-first
type-safe
dependency-light
easy to understand
easy to maintain

Do not introduce a backend unless explicitly required.

Stack

Use the existing stack:

Bun
Next.js
TypeScript
Tailwind CSS
MDX
Shiki

Use Bun only.

Do not use:

npm
yarn
pnpm

Do not replace or add major tooling unless required by the task.

Task Gate

Before substantial work, classify the task and determine the minimum model capability and reasoning effort required.

The goal is:

minimum model
minimum reasoning
minimum context
minimum scope

while still completing the task reliably.

Do not use a stronger model only because:

the repository is large
many files exist
the prompt is long
the task may involve many lines of code

Escalate based on reasoning difficulty, ambiguity, architectural impact, and correctness risk.

Level 0 — Trivial

Recommended:

GPT-5.6 Luna / low

Typical tasks:

text or copy changes
documentation edits
comment improvements
simple Tailwind changes
rename
import/export cleanup
simple prop or type
obvious one-file fix
formatting

Characteristics:

1–2 files
known pattern
low risk
no architecture decision

Do not inspect unrelated files.

Level 1 — Routine

Recommended:

GPT-5.6 Luna / medium

Typical tasks:

normal UI component
responsive behavior
simple route
small bug fix
simple interaction
extending an existing pattern
small refactor
straightforward tests
using an already-installed dependency

Characteristics:

1–4 related files
clear requirements
existing pattern
limited architectural impact

Escalate only if implementation requires additional reasoning.

Level 2 — Standard Feature

Recommended:

GPT-5.6 Terra / medium

Typical tasks:

multi-file feature
MDX integration
content loader
metadata parsing
schema validation
search or filtering
shared domain model
reusable feature component
moderate refactor
Shiki integration
routing across multiple modules
Server / Client Component boundary changes

Characteristics:

multiple related modules
some design decisions
moderate regression risk

This is the default level for normal feature development.

Level 3 — Complex Engineering

Recommended:

GPT-5.6 Sol / medium

Increase reasoning to high only when necessary.

Typical tasks:

architecture changes
difficult debugging
unclear root cause
major refactor
breaking migration
complex TypeScript
difficult build failures
rendering or performance problems
caching architecture
security-sensitive changes
cross-cutting Server / Client boundary changes

Characteristics:

multiple architectural layers
meaningful trade-offs
high ambiguity
high regression risk
Level 4 — Escalation

Recommended:

GPT-5.6 Sol / high

Use maximum available reasoning only as a last resort.

Use Level 4 when:

normal attempts have failed
root cause remains unclear
multiple systems interact unexpectedly
architectural constraints conflict
correctness risk is unusually high
a migration affects large parts of the application
the task cannot be decomposed safely

Do not start at Level 4 without clear evidence that it is necessary.

Escalation Order

Prefer gradual escalation:

Luna low
    ↓
Luna medium
    ↓
Terra medium
    ↓
Sol medium
    ↓
Sol high

Do not jump directly to the strongest configuration without a concrete reason.

Task size alone is not a reason to escalate.

De-escalation

A complex task may contain simple subtasks.

Use the lowest appropriate capability for each stage when model switching is available.

Example:

Architecture decision
        → Sol

Feature implementation
        → Terra

Styling / content cleanup
        → Luna

Do not keep expensive reasoning enabled after the difficult part is complete.

Complexity Signals

Escalate when several of these are true:

requirements are ambiguous
no existing pattern exists
several architectural layers are affected
data ownership is unclear
Server / Client boundaries change
public contracts change
backward compatibility matters
failures are difficult to reproduce
multiple solutions have meaningful trade-offs
changes are difficult to reverse
correctness risk is high

Do not escalate solely because a task requires many lines of code.

Gate Output

For Level 0–1 tasks, perform the gate internally and continue.

For Level 2+ tasks, briefly report before substantial implementation:

Task Gate: Level <n>
Recommended: <model> / <effort>
Scope: <relevant area>
Docs: <relevant docs>
Risk: <low | moderate | high>

Keep the gate report concise.

Model Mismatch

If the currently selected model is known and is weaker than the recommended level:

do not modify files
do not perform broad repository exploration
report the recommended model and reasoning effort
explain the escalation reason in one or two sentences
stop

If the current model cannot be identified, report the recommendation for Level 2+ tasks and proceed only when the environment allows the required capability.

If the selected model is stronger than required:

continue normally
keep reasoning minimal
keep context minimal
do not expand task scope

Do not restart completed work merely to downgrade the model.

Context Rule

Model capability does not justify loading more context.

Regardless of task level:

inspect the target file first
inspect direct dependencies only when needed
search for existing patterns
read only relevant documentation
expand scope incrementally

A stronger model must not automatically scan more of the repository.

Documentation Routing

Detailed rules live in docs/.

Do not read every document for every task.

Read only what is relevant.

Product

Read:

docs/PRODUCT.md

Use for:

product behavior
feature scope
user flows
navigation
concept taxonomy
Architecture

Read:

docs/ARCHITECTURE.md

Use for:

project structure
routing
data flow
content loading
MDX architecture
Shiki architecture
Server / Client boundaries
architecture decisions
Coding Convention

Read:

docs/CODING-CONVENTION.md

Use for:

implementation
refactoring
naming
TypeScript
React conventions
reusable APIs
comments
code review
Content Guide

Read:

docs/CONTENT-GUIDE.md

Use for:

MDX content
educational writing
framework comparisons
code examples
concept structure
Scoped Instructions

Directories may contain more specific AGENTS.md files.

Examples:

src/AGENTS.md
content/AGENTS.md

When modifying files inside such directories:

follow this root AGENTS.md
follow the nearest scoped AGENTS.md
read only relevant docs/

More specific rules take precedence unless they conflict with mandatory root rules.

Before Making Changes

Before implementation:

understand the requested behavior
run the Task Gate
inspect the target file
inspect direct dependencies only when necessary
search for an existing implementation pattern
reuse existing components, utilities, types, and styles
read relevant project documentation
read relevant Next.js documentation from node_modules/next/dist/docs/ when changing Next.js APIs or conventions

Do not scan the entire repository by default.

Do not read unrelated files only to gather context.

Core Engineering Rules
Next.js

Use Server Components by default.

Use "use client" only when required for:

event handlers
browser APIs
local interactive state
client-only libraries

Keep Client Component boundaries small.

Prefer:

Server Components
static generation
server-side data preparation
minimal browser JavaScript

Do not introduce API routes or Server Actions without a real requirement.

When Next.js behavior is uncertain, use the documentation installed in:

node_modules/next/dist/docs/

Do not rely on remembered framework behavior when local documentation differs.

Architecture

Follow:

docs/ARCHITECTURE.md

General dependency direction:

app
 ↓
components
 ↓
lib
 ↓
types

Content access:

app
 ↓
lib/content
 ↓
content/

Do not add architectural layers for hypothetical future needs.

TypeScript

Use strict TypeScript.

Prefer:

explicit domain types
narrow types
existing reusable types
literal unions
unknown instead of any

Avoid:

duplicated types
unnecessary assertions
unnecessary generics
any unless unavoidable

Detailed rules live in:

docs/CODING-CONVENTION.md
React

Use functional components.

Prefer:

focused components
composition
derived values
local state for local concerns
Server Components where possible

Avoid unnecessary:

useEffect
useMemo
useCallback
duplicated state
global state

Do not add state-management libraries without a demonstrated requirement.

Styling

Use Tailwind CSS.

Reuse existing:

design tokens
components
spacing
typography
color
responsive patterns

Do not introduce:

CSS-in-JS
styled-components
another styling framework
unnecessary inline styles
unnecessary arbitrary values
Content

Educational content belongs in MDX.

Follow:

docs/CONTENT-GUIDE.md

Canonical framework order:

React Native
Flutter
Jetpack Compose
SwiftUI

Equivalent examples should demonstrate equivalent behavior.

Do not force false one-to-one mappings between frameworks.

Do not put long educational content directly inside React components.

Shiki

Use the shared Shiki implementation.

Prefer server-side highlighting.

Do not:

duplicate Shiki configuration
create unnecessary highlighter instances
ship Shiki to the browser without a clear requirement
add another syntax-highlighting library
Dependencies

Avoid adding dependencies.

Before installing anything, check:

existing project dependencies
Next.js capability
React capability
browser APIs
whether a small local utility is enough

Only add a dependency when it solves a real problem or clearly improves maintainability.

Use Bun:

bun add <package>

Development dependencies:

bun add -d <package>
Code Documentation

Follow:

docs/CODING-CONVENTION.md

Comments should have library-quality standards.

For reusable or public APIs, document meaningful:

contracts
constraints
side effects
edge cases
design decisions

Use TSDoc / JSDoc when it adds useful information.

Implementation comments should explain:

why
non-obvious behavior
constraints
trade-offs
workarounds

Do not comment obvious code.

All source-code comments should use concise technical English.

Scope Control

Make the smallest reasonable change that satisfies the task.

Do not:

refactor unrelated code
rename unrelated files
move unrelated files
reformat unrelated files
update unrelated dependencies
rewrite working code for preference
redesign architecture while solving a local issue

Preserve existing behavior unless changing it is part of the task.

Stop when the requested work is complete.

Token Efficiency

Treat context as a limited resource.

For normal tasks:

read the target file
inspect direct dependencies when required
search for an existing pattern
read only relevant documentation
expand scope only when evidence requires it

Avoid:

full repository scans by default
reading every document
rereading unchanged files unnecessarily
broad analysis for local changes
repeating documentation in responses

Small task:

local context

Large feature:

incrementally expand context
Implementation Workflow

Use:

Task Gate
   ↓
Understand
   ↓
Inspect
   ↓
Find existing pattern
   ↓
Read relevant rules
   ↓
Implement smallest solution
   ↓
Validate
   ↓
Stop

Do not continue into optional refactoring after completing the requested work.

Validation

Run the smallest relevant check first.

Typical:

bun lint

For significant changes:

bun build

Run relevant tests when available.

Fix issues introduced by the current change.

Do not modify unrelated code to fix unrelated pre-existing failures.

If validation fails because of an existing issue, report it clearly.

Git

Keep diffs focused and reviewable.

When suggesting commit messages, use Conventional Commits:

type(scope): description

Examples:

feat(comparison): add framework tabs
fix(shiki): handle unsupported languages
docs(content): add local state comparison
refactor(content): centralize concept metadata

Common types:

feat
fix
refactor
docs
style
test
chore
Response Style

After completing work, report only what is useful:

what changed
important files changed
validation result
blockers or decisions requiring user input

Keep responses concise.

Do not:

repeat large code already written to files
explain obvious implementation details
provide long tutorials unless requested
Decision Priority

When several valid solutions exist, prefer:

existing project pattern
simplest correct solution
Next.js native capability
React native capability
browser native capability
small local utility
external dependency

Prefer predictable code over clever code.

Final Rule

Internationalization

The application supports English and Vietnamese.

- Use canonical locale routes: `/en/...` and `/vi/...`.
- Keep locale selection in the URL; do not make a browser-only language choice
  the source of truth for a public page.
- Preserve framework names, API names, identifiers, filenames, code, and code
  comments unless a translation is explicitly needed for comprehension.
- Translate user-facing UI, metadata, empty states, errors, and educational
  prose for every supported locale.
- English is the technical source of truth. Vietnamese translations must be
  accurate, natural, concise, and accessible to Vietnamese developers; do not
  translate technical terms when the established English term is clearer.
- Keep locale content structurally equivalent. A translation may clarify an
  idea, but must not silently add or remove technical claims.
- Add canonical and language-alternate metadata for localized public routes.
- Validate both locales whenever routing, content, or UI copy changes.

Optimize for:

clarity
correctness
small changes
stable architecture
minimal dependencies
minimal client JavaScript
minimal context
maintainability

Avoid:

over-engineering
premature abstraction
unnecessary refactoring
unnecessary dependencies
unnecessary context
client-heavy solutions

A good change should be easy for another developer to understand, review, and maintain.
