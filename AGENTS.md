<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions

Educational comparison site for React Native, Flutter, Kotlin / Jetpack Compose, and Swift / SwiftUI. Keep it content-first, static-first, server-first, type-safe, dependency-light, and maintainable. Use the existing Bun, Next.js, TypeScript, Tailwind CSS, MDX, and Shiki stack. Bun only; no npm, yarn, or pnpm. Do not add a backend unless explicitly required.

## Workflow: UNDERSTAND, EXECUTE, VERIFY

1. **UNDERSTAND:** Classify internally as SIMPLE (clear, local, existing pattern) or COMPLEX (ambiguous, architectural, or high correctness risk). SIMPLE: execute without a plan. COMPLEX: briefly state scope, plan, verification, and risks before coding; request approval only when genuinely required.
   Inspect the target file first, then relevant dependencies and existing patterns. Read applicable scoped `AGENTS.md` files (such as `src/AGENTS.md` and `content/AGENTS.md`); specific rules take precedence unless they conflict with mandatory root rules. Expand context only when evidence requires it.
   Read only relevant docs: `docs/PRODUCT.md` for behavior; `docs/ARCHITECTURE.md` for structure, routing, data, and boundaries; `docs/CODING-CONVENTION.md` for implementation and comments; `docs/CONTENT-GUIDE.md` for educational content; `docs/content-model.md` for schemas.
   Treat supplied plans and prompt templates as context unless the user invokes them. When following PLAN tasks, do one eligible task per run, respect dependencies and Owner gates, and mark completion only with acceptance evidence.
2. **EXECUTE:** Implement the smallest correct solution. Apply KISS, DRY, and YAGNI; reuse existing components, utilities, types, and styles. Preserve behavior and user changes. Avoid speculative abstractions, unnecessary files, unrelated refactors, formatting, renames, and dependency updates.
   Work autonomously within the permitted workspace. Prefer existing patterns, Next.js/React/browser capabilities, then a small local utility before a dependency. Add dependencies only for a demonstrated need; do not replace major tooling unless required.
3. **VERIFY:** Run the smallest relevant checks first: `bun lint`, `bun typecheck`, relevant `bun test`, and `bun build` for significant changes. Run snippet or content verification when relevant and available; satisfy any explicitly required acceptance checks. Do not sacrifice correctness, security, or essential tests to save tokens.
   Fix failures introduced by the task; report pre-existing failures and environmental blockers without unrelated fixes. Never claim an unrun check passed. Review the final diff and stop once requirements are met; repeat checks only after relevant changes or unresolved failures. Reply briefly in Vietnamese: changes, verification results, blockers. Use concise Caveman communication without verbose reasoning summaries; write normal technical prose in repository documents and comments.

## Efficiency, models, and safety

- Prefer low reasoning effort for SIMPLE tasks; increase only for actual ambiguity, architectural impact, or correctness risk. Repository size and line count alone do not justify escalation. `AGENTS.md` does not switch models or runtime reasoning settings; do not add a model-switching system unless requested.
- Apply Caveman (concise communication) and Ponytail (minimal code, no speculative engineering) directly. Use installed tools and skills only when useful; do not install additional agents, MCPs, or frameworks. Do not spawn subagents for routine tasks. Avoid repeated reads, redundant searches, broad repository scans, repeated planning, and reviews of unchanged code. Prefer `rg` and batch independent lookups when useful.
- Windows 11: use PowerShell, literal paths, and safe quoting. Use native filesystem commands; verify resolved targets before recursive deletion or moves. Never expose secrets in commands or output.
- Never commit, push, deploy, or perform destructive actions without user authorization. Ask only for genuinely required approval; existing authorization persists. Keep diffs focused; authorized commits use Conventional Commits: `type(scope): description`.

## Engineering rules

- Use Server Components, static generation, and server-side data preparation by default. Keep `"use client"` boundaries small and limited to event handlers, browser APIs, local interactive state, or client-only libraries. Add API routes or Server Actions only for a real requirement.
- Follow dependency direction `app` to `components` to `lib` to `types`; access content through `app` to `lib/content` to `content/`. Do not add architectural layers for hypothetical needs.
- Use strict TypeScript, explicit domain types, narrow unions, and `unknown` over `any`. Avoid duplicated types, unnecessary assertions, and unnecessary generics.
- Use focused functional React components, composition, derived values, and local state. Avoid unnecessary effects, memoization, duplicated state, global state, and state-management libraries.
- Use Tailwind and existing design tokens, spacing, typography, colors, and responsive patterns. No CSS-in-JS, styled-components, additional styling frameworks, or unnecessary inline styles and arbitrary values.
- Keep educational content in MDX and follow the content guide. Keep long educational prose out of React components. Canonical framework order: React Native, Flutter, Jetpack Compose, SwiftUI. Equivalent examples must demonstrate equivalent behavior; do not force false one-to-one mappings.
- Reuse shared Shiki configuration and highlighter instances; highlight on the server. Do not add another syntax highlighter or ship Shiki to the browser without a clear requirement.
- Use concise technical English for source comments. Document meaningful public contracts, constraints, side effects, and edge cases with TSDoc/JSDoc when useful. Explain non-obvious decisions and workarounds; do not comment obvious code.

## Internationalization

- Support English and Vietnamese at canonical `/en/...` and `/vi/...` routes. The URL is the locale source of truth for public pages; add canonical and language-alternate metadata.
- Translate user-facing UI, metadata, empty states, errors, and educational prose for both locales. English is the technical source of truth; Vietnamese must be accurate, natural, concise, and accessible to developers.
- Preserve framework/API names, identifiers, filenames, code, and code comments unless translation is explicitly needed for comprehension. Retain established English technical terms when clearer.
- Keep locale content structurally equivalent without silently adding or removing technical claims. Validate both locales whenever routing, content, or UI copy changes.
