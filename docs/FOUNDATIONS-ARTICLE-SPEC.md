# Foundations pilot article specification

Task: F02 blueprint, calibrated by F05. The real EN/VI pilot is now authored and registered as a reviewed draft; F07 controls publication after F06 quality reporting. This document retains the original blueprint and placeholder example as historical design context. Actual source dates and body imports live in the [registry](../content/foundations/index.ts); execution evidence belongs to the [F05 log](FOUNDATIONS-LOG.md#f05--pilot-authoring-and-editorial-review--2026-10-15).

Use the [article contract](content-model.md#foundations-articles-f02-contract) and [editorial rules](CONTENT-GUIDE.md#53-foundations-articles). This blueprint demonstrates a knowledge article with long prose, contextual citations, accessible figures, and paired locales, without exercises or paired implementation requirements.

## Identity and scope

| Field                   | Specification                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Catalog ID              | A03, the F05 pilot                                                                                                          |
| Slug                    | `process-death-and-state-restoration`                                                                                       |
| Topic                   | `runtime-lifecycle`                                                                                                         |
| OS scope                | Android and iOS; separate their actual guarantees                                                                           |
| Framework scope         | Discuss relevant approaches in React Native, Flutter, Jetpack Compose, SwiftUI order; no requirement for four code snippets |
| Planned English body    | `content/foundations/en/process-death-and-state-restoration.mdx`                                                            |
| Planned Vietnamese body | `content/foundations/vi/process-death-and-state-restoration.mdx`                                                            |
| Planned public routes   | `/en/foundations/process-death-and-state-restoration` and `/vi/foundations/process-death-and-state-restoration`             |

The reader should understand which state belongs to which owner, which restoration mechanisms apply under which conditions, and how an application reconstructs useful state after losing its process. The article must distinguish process death, configuration change, force-stop, component unmount, and ordinary backgrounding. These are research and explanation requirements, not unverified claims of equivalence across platforms.

## Draft metadata example

The original example below described the F02 contract; its types now exist as production exports. Placeholder text is retained only to explain the original proposed fields; it is not an approved translation. No MDX body imports are supplied by this historical example. Its empty reference array records that no source was newly verified in F02. This example cannot publish; the real pilot entry is separate.

```ts
const pilotMetadata: FoundationArticleMetadata = {
  slug: "process-death-and-state-restoration",
  topic: "runtime-lifecycle",
  order: 30,
  status: "draft",
  platforms: ["android", "ios"],
  technologies: ["react-native", "flutter", "kotlin", "swiftui"],
  locales: {
    en: {
      title: "Process Death and State Restoration",
      description:
        "Understand state ownership, restoration inputs, and durable data when a mobile process is recreated.",
      keywords: ["process death", "state restoration", "SavedStateHandle"],
    },
    vi: {
      title: "<Vietnamese title to be written in F05>",
      description: "<Faithful Vietnamese summary to be written in F05>",
      keywords: ["<Vietnamese search term>", "SavedStateHandle"],
    },
  },
  references: [],
  relatedArticles: [],
  relatedConcepts: ["state-restoration", "local-storage", "authentication"],
};
```

Add actual body imports, reviewed source records, and each locale's real `reviewedAt` only when that work is complete. Replace all placeholder strings before publication. Add related article slugs only after they exist in the registry; the article catalog alone does not create a destination.

## Body outline shared by both locales

The route supplies the localized H1. Both bodies use Markdown H2/H3 headings and convey the same mechanisms, conditions, and limitations. The following labels describe English sections; F05 writes natural Vietnamese headings and prose in the Vietnamese MDX file. Heading fragments may differ by locale.

| Section                               | Required explanation                                                                                                                    | Illustration or evidence                                                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| What disappears when a process ends?  | Define process-owned memory, distinguish process state from component identity, and introduce the practical failure scenario            | Cite reviewed lifecycle/process sources next to claims                                    |
| Different events, different lifetimes | Compare backgrounding, unmount, configuration change, system recreation, and force-stop without implying identical Android/iOS behavior | A scoped event/ownership table; explain unsupported combinations                          |
| Choosing restoration inputs           | Explain small UI inputs, navigation IDs, drafts, domain data, and credentials; discuss lifetime, size, ownership, and trust             | `state-ownership` figure and prose equivalent                                             |
| Reconstructing a screen               | Trace initialization, restoration inputs, repository loading, authorization, current data, and failure outcomes                         | `restoration-sequence` figure with actors and branches                                    |
| Platform and framework boundaries     | Explain documented Android/iOS behavior, then applicable framework APIs and missing equivalences                                        | Cite primary sources for each platform claim; use existing code only for its actual scope |
| What can go wrong?                    | Explain missing/stale data, absent restoration state, storage failure, changed account, revoked session, and interrupted saves          | Annotated alternatives in the sequence and surrounding prose                              |
| Tradeoffs and misconceptions          | Explain when saved UI state, local durability, or server drafts fit; distinguish convenience from guarantees                            | Refer back to mechanisms and sources, not a generic API ranking                           |

The article explains the scenario; it does not ask the reader to reproduce process death, implement a form, answer questions, or mark a lesson complete. Existing device-test instructions in concept production notes are author verification context, not reader assignments to import.

## Source and citation plan

These are proposed article-local IDs. Existing candidates come from the `state-restoration` entry in [the reference registry](../content/concepts/references.ts) and [the inventory](FOUNDATIONS-INVENTORY.md). None is a newly reviewed source record. Before citing an ID in an actual body, F05 must inspect the exact primary-source section and add a valid `FoundationReference` with its actual review date and applicable version.

| Proposed source ID             | Candidate or research target                                     | Intended claim scope                                                 |
| ------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| `android-state-saving`         | Existing candidate: Android Developers, Save UI states           | Android state lifetime/restoration conditions and limits             |
| `android-compose-state-saving` | Existing candidate: Android Developers, Save UI state in Compose | Compose saved-state mechanisms and payload constraints               |
| `react-navigation-persistence` | Existing candidate: React Navigation state persistence           | Explicit navigation persistence configuration and limits             |
| `ios-state-restoration`        | New research: Apple lifecycle and UI restoration documentation   | iOS-specific restoration and termination behavior                    |
| `flutter-state-restoration`    | New research: Flutter restoration documentation                  | Framework/OS restoration scope, rather than durable business storage |
| `swiftui-state-ownership`      | New research: Apple SwiftUI state and restoration documentation  | View state ownership and the limits of any restoration analogy       |

Add, remove, or split source IDs when actual claims require it; keep the finalized shared set consistent across both locale bodies. Do not add sources merely to reach a reference count, and do not reuse an Android citation to support an iOS claim. Publisher titles may stay in their original language; citation labels and reference UI are localized.

This MDX excerpt illustrates the future component syntax, not researched article prose. `android-state-saving` is deliberately unregistered in the draft example above, so this excerpt is not a valid publication fixture:

```mdx
## Choosing restoration inputs

Explain the reviewed, platform-scoped lifetime constraint here.

<Citation source="android-state-saving" />

<Figure
  id="state-ownership"
  src="/illustrations/foundations/process-death-and-state-restoration/state-ownership.svg"
  alt="Describe which owner retains each state category and which boundaries lose it."
  caption="State owners and storage boundaries; the accompanying prose explains conditions."
  sources={["android-state-saving"]}
/>

Explain every meaningful arrow, lifetime, and limitation in adjacent prose.

## Reconstructing a screen

Explain the initialization and recovery sequence before showing the second figure.
```

The Vietnamese body uses the same reference and figure IDs, translates explanation/alt/caption, and preserves code/API names. `Citation` links to the generated reference entry; authors do not duplicate a bibliography inside the body.

## Figure plan

All paths below are planned assets, not existing files. Both figure IDs must appear in each published locale. Either share a technically labeled SVG with complete localized explanation or provide locale-specific SVG filenames under the same article directory.

| Figure ID              | Representation            | Essential information and accessible explanation                                                                                                                                                                                                                     |
| ---------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state-ownership`      | Ownership/storage diagram | Identify component memory, restoration inputs, durable application data, and server-owned data. Explain which boundary each belongs to and which conditions are simplified. Do not imply that a database replaces secure credential storage.                         |
| `restoration-sequence` | Sequence diagram          | Label OS, process initialization, state owner, local storage/repository, and remote service where relevant. Explain ordinary reconstruction, absent state/data, changed account, and unavailable network without promising a guaranteed callback before termination. |

Use labels, shapes, and text rather than color alone. Add localized captions/alt text and prose equivalents. Explain model simplifications and cite sources for mechanisms. Confirm SVG readability on mobile/light/dark views in F05; attributes being present is not accessibility evidence by itself.

## Code reuse boundary

The [Kotlin production snippet](../content/snippets/state-restoration/kotlin/production.kt) illustrates reading an ID through SavedStateHandle and observing a repository. The [React Native production snippet](../content/snippets/state-restoration/react-native/production.tsx) illustrates using a route ID to load data. They do not form equivalent complete persistence implementations, and neither proves the full article's recovery behavior.

Use one or both only if the surrounding explanation makes that scope clear. An example may be omitted when a diagram and prose explain the point better. The article does not require additional snippets just to fill framework sections. If shown, reference files rather than copying code into both bodies:

```mdx
<Snippet path="state-restoration/kotlin/production.kt" language="kotlin" />
```

Record actual compiler/runtime checks separately when authoring. Existing compilation baselines are described in [VERSIONS.md](VERSIONS.md); this specification does not rerun them or establish a native restoration guarantee.

## Review and publication boundary

The following is an author/reviewer checklist, not reader-facing article content:

- Review every platform-sensitive claim against the exact primary source and record applicable versions and dates.
- Check that English and Vietnamese explain the same conditions, failure branches, sources, figures, and snippet references.
- Check source support and diagram meaning manually; run available structural checks for IDs, paths, anchors, locale parity, and publication readiness.
- Remove placeholder prose, unsupported claims, and any accidental exercise/quiz instructions.
- Review the actual reader in both locales, mobile/desktop, and light/dark themes after F04 exists.
- Set `published` only when both bodies and locale reviews are complete and all relevant checks pass. Draft metadata and this blueprint alone cannot satisfy that requirement.

F02 acceptance covered this blueprint and the shared contract/editorial/product documents. Actual A03/F05 acceptance is recorded separately in the plan and execution log; this placeholder example remains outside the registry.

## F05 pilot calibration

The real pilot uses [English](../content/foundations/en/process-death-and-state-restoration.mdx) and [Vietnamese](../content/foundations/vi/process-death-and-state-restoration.mdx) bodies with the same technical scope, figure IDs, source IDs, and framework order. It replaces the proposed source set with thirteen actually reviewed primary sources and uses locale-specific SVG labels. These corrections guide later article specifications:

- Separate live memory, an eligible restoration checkpoint, a committed local record, and remote accepted data. The diagram must show reconstruction inputs, not a serialized heap or an unconditional chain of durable copies.
- Explain when a mechanism captures changes and what happens when no checkpoint is supplied. Do not promise a final callback or the newest character after arbitrary termination.
- Keep Android task dismissal, configuration change, process death, and component unmount distinct. Scope the Apple sample's force-quit warning to its debugging procedure; do not infer a universal iOS archive-deletion rule from it.
- Label authentication readiness, account isolation, missing/read-failed data, offline behavior, conflicting revisions, and unknown side effects as application recovery policies. Platform state APIs do not implement them for the author.
- Preserve the distinction between UIKit view-controller archives and SwiftUI scene storage. Keep sensitive credentials out of restoration examples; an account or record ID is not authorization.
- A concrete scenario can replace executable snippets. The pilot intentionally displays no code because the existing snippets do not implement the complete recovery policy; no new native compilation or runtime guarantee is claimed.
- Review publication readiness with both bodies, but retain `draft` until F07. A03 is authored once in F05; Wave 1 must not duplicate this task. Future technical changes require renewed locale/source review.
- Use the reader's horizontal table region for prose-heavy comparisons instead of compressing columns to viewport width. Keep shared reference `version` values to actual version identifiers; put source applicability and unpinned review scope in editorial evidence, not English sentences displayed in both locales.
