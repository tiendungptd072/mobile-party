# Agent prompts for `docs/PLAN.md`

Copy a prompt into Codex or Claude Code. Prompts are in English because the repository and its agent rules are in English; each prompt tells the agent to reply to you in Vietnamese.

## Before the first run

1. Put `PLAN.md` and this file in `docs/`, commit them.
2. Open `docs/PLAN.md` section 2 and confirm or edit decisions D1–D7 (tick "Confirmed").
3. Start from a clean branch.

## Operating tips

- One agent at a time on the repository. One task per session keeps context small and diffs reviewable.
- Use the other agent as reviewer (Prompt 4) before merging: for example Codex implements, Claude Code reviews, or the reverse.
- Level 3 tasks (P0.3, P0.4, P0.7, P0.8) deserve the strongest model you have and a plan before edits.
- Human gates: P0.5 (Android SDK), P0.8 (public URL change), and P5.3–P5.5, P5.7 (emulator or device) need you.

---

## Prompt 1 — Continue the plan (core prompt, works for both agents)

Use as is to take the next task, or fill in `TASK_ID` to force a specific one.

```text
You are continuing a planned multi-phase effort in this repository (mobile-party: a Next.js site that compares mobile frameworks). The effort's goal: make React Native ⇄ Jetpack Compose coverage complete and verifiable.

Read first, in this order, and nothing else until needed:
1. AGENTS.md and the nearest scoped AGENTS.md for the files you will touch (src/AGENTS.md or content/AGENTS.md).
2. docs/PLAN.md: section 0 (agent rules), section 2 (decisions), section 3 (working agreements), and the task you pick.
3. docs/PLAN-LOG.md if it exists: what was already done and any open questions.
Then read only the docs the task needs (docs/ARCHITECTURE.md, docs/CONTENT-GUIDE.md, docs/content-model.md, docs/CODING-CONVENTION.md).

Choose the work:
- TASK_ID: <leave empty to auto-select>. If empty, take the first unchecked task in docs/PLAN.md whose dependencies are all checked. Do exactly one task.
- If the task is marked "Owner" and the related decision in section 2 is not confirmed, stop and ask me. Do not guess.

Before editing, report in at most 6 lines: task ID and title, Task Gate level, files you expect to touch, how you will verify, risks or open questions. Then proceed unless the task is Level 3, in which case present a short plan and wait for my approval.

Execute:
- Follow the task's "Do" and "Accept" items literally. Do not expand scope, refactor unrelated code, or reformat unrelated files. Bun only. No new root dependencies unless the task says so.
- Never invent APIs. Verify version-sensitive APIs (Expo, React Navigation, Compose, Navigation Compose, Hilt, Retrofit, etc.) against official docs for the versions in docs/VERSIONS.md. If you cannot verify a claim, keep it out of content and list it under "Unverified".
- React Native and Compose examples must implement the same behavior (docs/CONTENT-GUIDE.md section 13).

Finish:
- Run: bun lint, bun typecheck, bun test, bun build, and bun run verify when it exists. Fix failures caused by your change. If a command cannot run for an environmental reason (no network, no Android SDK, no emulator), say which command and why. Never claim it passed.
- Tick the task checkbox in docs/PLAN.md only if every Accept item is met. Otherwise leave it unchecked and say what is missing.
- Append an entry to docs/PLAN-LOG.md using the template in docs/PLAN.md section 12.
- Commit on branch plan/<task-id> with message "plan(<task-id>): <summary>". Do not push or merge.
- Final report: files changed, commands run with results, Unverified items, gaps found, follow-ups. Reply to me in Vietnamese. Keep code, comments, docs, commit messages, and content in English; Vietnamese content belongs only in vi locale files.
```

### Addendum for Codex (append to Prompt 1)

```text
Codex-specific:
- AGENTS.md is your primary instruction file. Apply its Task Gate and use the recommended capability for the task level.
- If your current model is known to be weaker than the level requires, follow the "Model Mismatch" rule: report the recommended model and effort, and stop without editing.
- Keep context minimal: inspect the target file first, then direct dependencies only.
```

### Addendum for Claude Code (append to Prompt 1)

```text
Claude Code-specific:
- CLAUDE.md imports AGENTS.md. The Task Gate there names GPT models, which do not apply to you. Do not apply the "Model Mismatch" stop rule literally: report the Task Gate level and continue. For Level 3 tasks, work in plan mode first and wait for my approval before editing.
- Use read-only exploration for lookups. Keep the repository changes limited to the chosen task.
- Keep context minimal: inspect the target file first, then direct dependencies only.
```

---

## Prompt 2 — Do one named task

Shortcut when you already know which task you want.

```text
Do task <TASK_ID> from docs/PLAN.md and nothing else. Follow every rule in docs/PLAN.md section 0 and the process in the "Continue the plan" prompt: report the gate first, execute the task's Do and Accept items, run the verification commands, tick the checkbox only if all Accept items are met, log in docs/PLAN-LOG.md, commit on plan/<TASK_ID>. If a dependency task is unchecked, stop and tell me. Reply in Vietnamese; keep repo files in English.
```

---

## Prompt 3 — Author concepts (Phases 1–3 content tasks)

For tasks like P1.1–P1.5, P2.x, P3.x. List one to three related tasks per run.

```text
Write the concept(s) for these plan tasks: <TASK_IDS, e.g. P1.1 side-effects, P1.4 derived-state>.

Read AGENTS.md, content/AGENTS.md, docs/CONTENT-GUIDE.md, docs/content-model.md, the task rows in docs/PLAN.md section 7, and one or two existing concepts for style (for example content/concepts/local-state.ts and its snippets). Do not scan the rest of content/.

For each concept:
1. Verify every API against official docs for the versions in docs/VERSIONS.md before writing.
2. Write snippet files for React Native and Kotlin at all three stages (basic, applied, production) under content/snippets/<slug>/<technology>/<stage>.<ext>, following the snippet convention in P0.4 (display region markers, per-file Kotlin package). Both sides must implement the same behavior. Stage meaning: basic = smallest correct example; applied = typical real use with an event or input; production = lifetime, cancellation, error handling, or architecture as it would appear in a real app.
3. Create content/concepts/<slug>.ts with: title, description (one sentence of learning goal), category from CONCEPT_CATEGORIES, order, aliases and keywords that include the real API names, implementations (no inline code; snippets are loaded by convention), relationships with a label and an explanation of where the analogy stops, mentalModel, differences, commonMistakes, productionNotes. Do not force a one-to-one mapping. If the nearest equivalent is partial, say so.
4. Register it in content/concepts/index.ts and add or update the roadmap lesson in content/roadmaps/react-native-to-kotlin.ts (exercise, checklist, three stage descriptions). Link related concepts and recipes by canonical slug.
5. Update or add tests so the new content is covered.
6. Do NOT write Vietnamese; the phase's "vi sync" task covers it.

Finish by running bun lint, bun typecheck, bun test, bun build, bun run verify. Then print the Concept Definition of Done checklist from docs/PLAN.md section 6 with a check or cross per item and a one-line justification for each cross. Tick the plan tasks only if all items pass. Log in docs/PLAN-LOG.md and commit on plan/<first-task-id>. Reply in Vietnamese; keep repo files in English.
```

---

## Prompt 4 — Independent review (use the other agent)

Run in a fresh session on the branch to review. The reviewer must not edit files.

```text
Review branch plan/<TASK_ID> against docs/PLAN.md as an independent reviewer. Do NOT modify files, commit, or push.

1. Read AGENTS.md, the scoped AGENTS.md for the touched areas, docs/PLAN.md (section 0, section 6 if content, and the task's Do/Accept items), and the diff against the base branch.
2. Check: every Accept item met; scope respected (no unrelated edits, no new root dependencies); repository rules followed (Bun only, Server Components by default, kebab-case files, Tailwind only).
3. For content: verify code and API claims against official docs for the versions in docs/VERSIONS.md; check that React Native and Compose examples behave the same; check relationship labels for false equivalence; check aliases for duplicates; check the Concept Definition of Done item by item.
4. Run bun lint, bun typecheck, bun test, bun build, and bun run verify. Report exactly what ran and what could not.
5. Output findings grouped as Blocker, Major, Minor, Nit, each with file and line, why it matters, and a suggested fix. End with a verdict: approve, approve with minor changes, or request changes. Do not fix anything yourself.

Reply in Vietnamese; quote code and file paths in English.
```

---

## Prompt 5 — Vietnamese sync (closes each phase)

```text
Run the "vi sync" task for the current phase in docs/PLAN.md (<TASK_ID>).

Read content/AGENTS.md (Localization section), the localization decision record in docs/ARCHITECTURE.md, and docs/PLAN.md for the task. Use bun run content:status to list every concept, roadmap lesson, and recipe that lacks a vi overlay.

For each missing item, create the overlay under content/locales/vi/ containing only translatable strings in exactly the same structure as the English source (same array lengths). Rules:
- English is the source of truth for technical claims. Do not change English content in this task; if you find an error, log it in docs/PLAN-LOG.md instead.
- Translate naturally for developers. Keep established English technical terms (for example recomposition, ViewModel, hook, state hoisting, effect) and explain them in Vietnamese prose when it helps. Keep IDs, slugs, code, API names, filenames, and code comments unchanged.
- Keep one consistent term per concept across all files; record the choices in docs/glossary-vi.md (create it if missing) and reuse them.
- Preserve structure: relationship type, examples, mental model, common mistakes, production notes.

Finish: bun run content:status --strict shows vi complete for the covered items; bun lint, bun typecheck, bun test, bun build pass; open /vi/learn/react-native/kotlin and two concept pages to confirm they render Vietnamese. Tick the task, log it, commit on plan/<TASK_ID>. Reply in Vietnamese.
```

---

## Prompt 6 — Port trial (task P5.7)

Needs a human to run emulators and E2E flows. Use the agent for the port work and the logging.

```text
We are running a port trial for the reference app. Direction: <react-native-to-kotlin | kotlin-to-react-native>. Screen or feature: <name from docs/reference-app-spec.md>.

Rules:
- Port using ONLY this site's content (content/, docs/PORTING.md, public/porting/*.json) and the reference app spec. Do not rely on memory for APIs. If you need information that the site does not provide, that is a gap: write it down instead of silently looking it up. You may use official docs only to confirm correctness, and each such lookup must be logged as a gap.
- Follow the vertical-slice order in docs/PORTING.md: domain models, networking/repository, state holder, UI, tests.

While working, keep a log with: start and end time per step, every lookup outside the site (what you needed, why the site failed), every API mapping that turned out not to be equivalent, and every behavior bug found by the shared E2E flows (ask me to run them if you cannot).

At the end, append a "Port trial" entry to docs/PLAN-LOG.md and, for each gap, add a backlog item with priority (P0 blocks the port, P1 slows it noticeably, P2 minor). Do NOT fix the site content in this run. Propose new content tasks for P0/P1 gaps in docs/PLAN.md as unchecked tasks. Reply in Vietnamese; keep repo files in English.
```
