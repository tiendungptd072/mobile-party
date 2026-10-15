# Content Model

## Canonical identifiers

```ts
export const TECHNOLOGY_IDS = [
  "react-native",
  "flutter",
  "kotlin",
  "swiftui",
] as const;

export type Technology = (typeof TECHNOLOGY_IDS)[number];

export type Relationship = "equivalent" | "similar" | "different";
```

Display labels, languages, colors, and other presentation metadata remain in a
technology configuration keyed by these IDs. Display names are never used as
identifiers.

Canonical display order is React Native, Flutter, Jetpack Compose, then SwiftUI.

## Technology

```ts
export type TechnologyDefinition = {
  id: Technology;
  name: string;
  shortName: string;
  language: "tsx" | "dart" | "kotlin" | "swift";
};
```

## Concept

```ts
export type ConceptImplementation = {
  name: string;
  summary: string;
  language: CodeLanguage;
  code?: string;
  filename?: string;
};

export type ConceptRelationship = {
  from: Technology;
  to: Technology;
  type: Relationship;
  explanation: string;
};

export type ContentReference = {
  title: string;
  url: string;
  kind: "official-docs" | "sample" | "spec" | "further-reading";
  technology?: Technology;
  version?: string;
  verifiedAt: string;
};

export type Concept = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ConceptCategory;
  order: number;
  aliases: readonly string[];
  keywords: readonly string[];
  implementations: Partial<Record<Technology, ConceptImplementation>>;
  relationships: readonly ConceptRelationship[];
  mentalModel?: string;
  differences?: readonly string[];
  commonMistakes?: readonly string[];
  productionNotes?: readonly string[];
  references: readonly ContentReference[];
};
```

An implementation may be absent while content is being expanded. Rendering
must distinguish missing content from a concept that intentionally has no
direct equivalent.

Every concept must include implementations for at least two supported
technologies. No particular pair is required: a concept with only Flutter and
SwiftUI implementations is valid. The validator enforces this minimum at
runtime; the normalized TypeScript model uses a partial technology map.

Relationships are optional pair overrides in source content. An omitted
`relationships` field is normalized to `[]`; an explicit empty array is also
valid. Every declared relationship must reference two distinct technologies
with implementations in that concept. Concepts with three or more technologies
do not need to describe every pair.

## Roadmap

```ts
export type RoadmapLesson = {
  conceptSlug: string;
  title: string;
  order: number;
  exercise: string;
  checklist: readonly string[];
  stages: readonly LessonStage[];
};

export type LessonStage = {
  id: "basic" | "applied" | "production";
  title: string;
  description: string;
  examples?: Partial<Record<Technology, ConceptImplementation>>;
};

export type RoadmapSection = {
  id: string;
  title: string;
  order: number;
  lessons: readonly RoadmapLesson[];
};

export type Roadmap = {
  source: Technology;
  target: Technology;
  sections: readonly RoadmapSection[];
};
```

Roadmaps reference canonical concept slugs. Lesson explanations remain in the
concept content rather than being duplicated in roadmap data.

Stage examples are optional on each side. Explicit metadata and `snippet`
references take precedence, including distinct Learn basic files. For a missing
side, the loader checks `content/snippets/<concept>/<technology>/<stage>.<ext>`
for the roadmap's source and target technologies. It uses the concept's
implementation language when available, otherwise the technology's default
language. This also supports shell examples such as Android build variants.
It never substitutes basic code for an absent applied or production snippet.
Missing convention files remain absent; invalid files and broken explicit
references fail validation. Concepts still require at least two implementations;
stage examples may have zero, one, or more sides.

Learn uses the existing server-highlighted code comparison when both sides
exist. Otherwise it keeps available code visible and labels each missing side
as not yet written, in the current locale.

`bun run content:status` prints required concept/technology/stage rows with `en`
and `vi` columns. Required cells come from published roadmap source/target pairs;
unpublished technology tracks are excluded. Duplicate cells across roadmaps
must be complete in every occurrence. Each cell reports `ready`, `missing-code`,
`missing-translation`, or both missing conditions. Code is shared across locales;
Vietnamese requires the concept overlay and stage prose/title, so English
fallback does not count as translated. `bun run content:status --strict` exits
with code 1 when any required cell is incomplete. The command uses the same
validated content pipeline as the site, so malformed authored content also fails.

F06 appends a separate Foundations registry report; the concept/stage rows and
their completeness rules are unchanged. See [Foundations quality reporting](#foundations-quality-reporting-f06).

## Recipe

```ts
export type RecipeImplementation = {
  summary: string;
  language: CodeLanguage;
  code: string;
  filename?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: readonly string[];
  flow: readonly string[];
  implementations: Partial<Record<Technology, RecipeImplementation>>;
  architectureNotes: readonly string[];
};
```

## Content placement

```text
content/
  technologies/
  concepts/
  roadmaps/
  recipes/
```

Use TypeScript for concise structured data and MDX for long educational prose.
UI modules consume the normalized model and do not know the source file format.
Where MDX owns its metadata, use named exports because `@next/mdx` does not
parse YAML frontmatter without an additional plugin. Foundations instead keeps
article metadata in a typed registry and prose in imported MDX bodies, as
specified below; do not maintain both metadata sources for the same article.

### File-backed code

Implementation metadata omits `code` for `tsx`, `typescript`, and `kotlin`;
the validator rejects inline code in these languages for concepts, lesson
stages, and recipes. The server-only loader resolves omitted code from
`content/snippets/<concept>/<technology>/<stage>.<ext>`; Compare uses `basic`.
Recipe paths use `content/snippets/recipes/<recipe>/<technology>/main.<ext>`.

Source metadata may set `snippet` to an explicit path relative to
`content/snippets/`. Existing Learn basic examples with different code use
`learn-basic.tsx` or `learn-basic.kt` so the migration preserves both displays.
The normalized model exposes the loaded `code`, not the source reference.
Missing required implementation files or explicit references raise
`ContentValidationError` with the failing path. Missing convention-based stage
files remain absent, as described in the Roadmap section.

Only code between `// #region show` and `// #endregion` is displayed when a
region is present; files without a region display in full. Kotlin package
declarations stay outside the region and are unique per file. See
[`content/snippets/README.md`](../content/snippets/README.md) for extensions,
package naming, and root-tool exclusions.

## Validation rules

The Phase 2 validator must reject:

- unknown technology or relationship values
- empty required text fields
- duplicate IDs or slugs
- slugs that are not `kebab-case`
- a relationship whose source and target are identical
- implementations with unsupported language identifiers
- concepts with fewer than two implementations
- relationships referencing implementations absent from the concept
- roadmap lessons referencing unknown concept slugs
- related content references that are not canonical
- external references that are not HTTPS, contain duplicate URLs, or omit a
  valid ISO verification date

Validation runs at build time and reports the content file and failing field.

## Search projection

The build-time search index derives normalized entries from title, aliases, API
names, category, technology, and keywords. It contains only serializable data
needed by the client and never duplicates full lesson bodies.

## Foundations articles (F02 contract)

This is the F02 contract, with the registry/content pipeline implemented in F03
and static reader routes in F04. F05 supplies the reviewed bilingual A03 draft;
F06 adds structural reporting and link checks; public discovery/publication remains F07 work. Existing Concept/Roadmap/Recipe schemas remain
unchanged. Foundations has its own article model and does not require two implementations, exercises,
checklists, or three snippet stages.

### Files and registry

```text
content/foundations/index.ts
content/foundations/en/<slug>.mdx
content/foundations/vi/<slug>.mdx
public/illustrations/foundations/<slug>/<figure-id>.svg
```

Use explicit local MDX imports in the server-only registry. A registry entry
combines serializable metadata with a separate locale-to-body map; component
functions never enter a browser search index. The content loader is the route's
entry point. Metadata drives topic lists, route generation, related content,
search, and SEO. Do not copy article metadata into MDX frontmatter or route files.

Supply article/locale-specific component mappings to the imported MDX body on
the server so citations, figures, and snippets resolve against that article's
metadata. Do not introduce a client provider to distribute server-owned content.

Drafts may lack a locale body or unfinished source entries. A present body must
have corresponding locale metadata and valid authored references. F03 fixtures
must remain outside the public registry or be explicitly draft entries.

### Serializable metadata

Reuse `Locale`, `Technology`, and `ContentReference` from their domain modules.
The shapes below are implemented in [foundation.ts](../src/types/foundation.ts).
`Locale` now lives in [types/locale.ts](../src/types/locale.ts), with the existing
`lib/i18n/locale.ts` imports preserved through re-exports.

```ts
type FoundationTopic =
  | "runtime-lifecycle"
  | "state-rendering"
  | "concurrency"
  | "networking"
  | "storage-offline"
  | "architecture"
  | "navigation-platform"
  | "security-privacy"
  | "experience-quality"
  | "delivery-systems";

type MobilePlatform = "android" | "ios";

type FoundationReference = ContentReference & {
  id: string;
  platforms?: readonly MobilePlatform[];
};

type FoundationLocaleMetadata = {
  title: string;
  description: string;
  keywords: readonly string[];
  reviewedAt?: string;
};

type FoundationArticleMetadata = {
  slug: string;
  topic: FoundationTopic;
  order: number;
  status: "draft" | "published";
  platforms: readonly MobilePlatform[];
  technologies?: readonly Technology[];
  locales: Partial<Record<Locale, FoundationLocaleMetadata>>;
  references: readonly FoundationReference[];
  relatedArticles: readonly string[];
  relatedConcepts: readonly string[];
};
```

Slugs/source IDs/figure IDs are lowercase ASCII `kebab-case`. A slug is unique
across the article registry; source and figure IDs are unique within an article
and shared across its locales. `order` is a nonnegative integer; ties sort by
slug. Topic labels are localized UI strings keyed by the ten topic IDs from
[the inventory](FOUNDATIONS-INVENTORY.md). Keep one implementation list of IDs.

`platforms` is nonempty and describes the OS scope of the explanation.
`technologies`, when present, lists only framework approaches actually discussed;
it does not claim compiler verification, completeness, or a minimum count.
Missing technologies do not generate empty framework sections. Framework display
order remains React Native, Flutter, Jetpack Compose, SwiftUI.

Locale titles, descriptions, and keyword entries are nonempty text. Keywords
may be translated while API names remain intact. `reviewedAt` records completed
technical/editorial review of that locale body, with translation parity included
for Vietnamese. It is optional in drafts, required in both locales for publication,
and never an automatic timestamp applied by rendering or building.

Each reference retains the existing kind/title/HTTPS URL/`verifiedAt`/optional
version/optional technology fields. An optional platform list scopes an OS-specific
source; its absence means no platform tag is asserted. It does not override what
the source actually supports. IDs and exact URLs are unique per article. Preserve
useful deep links into source sections. Dates are real calendar dates in
`YYYY-MM-DD`, not in the future when validated. Record applicable version details
for version-sensitive claims; dates and version strings alone cannot establish
that the claim is supported. Do not copy a candidate source into a verified entry
until its content has been checked.

### Body components and contextual references

The article body uses Markdown plus these server-rendered MDX contracts:

| Component  | Required properties           | Meaning                                                                                                       |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Citation` | `source`                      | Resolve one article reference ID to its number and `#source-<id>` entry                                       |
| `Figure`   | `id`, `src`, `alt`, `caption` | Render an article-owned image as an accessible figure; optional `sources` is a literal array of reference IDs |
| `Snippet`  | `path`, `language`            | Read a required file relative to `content/snippets/` and highlight its display region on the server           |

For example, the following is syntax, not a registered or verified article:

```mdx
The adjacent paragraph explains a scoped mechanism.

<Citation source="android-state-saving" />

<Figure
  id="restoration-sequence"
  src="/illustrations/foundations/process-death-and-state-restoration/restoration-sequence.svg"
  alt="An explanation of the actors and transitions shown in the sequence."
  caption="A simplified restoration sequence, with its scope explained below."
  sources={["android-state-saving"]}
/>

<Snippet path="state-restoration/kotlin/production.kt" language="kotlin" />
```

The reference list is generated once from the shared metadata; authors do not
handwrite a second list. Citation numbers follow registry reference order and are
identical across locales. Repeated citations reuse the same number. References
render with `source-<id>` anchors, figures with `figure-<id>` anchors, and headings
with `section-` anchors. An article may cite a source more than once. Every
registered source must be used by a citation or a figure in each published locale;
the set of cited source IDs must match across published locales. This catches
structural omissions, not differences in the meaning of claims.

Figure paths are local public assets inside that article's illustration directory;
do not fetch arbitrary remote images at render time. SVG is the starting format;
use a local raster asset only for a demonstrated explanatory need. Missing assets,
empty captions/alternative text, and duplicate figure IDs are invalid. The figure
ID set must match between published locales; localized asset filenames and prose
may differ. A shared technical image needs an explanatory prose equivalent in
both languages. Document attribution/license in nearby prose when applicable.
Technical accuracy, readability, meaningful alternative text, and reuse rights
require editorial review in addition to path/attribute checks.

Snippet paths must remain inside the canonical snippet root after resolution;
reject traversal/absolute paths and missing files. Reuse display-region extraction
and path-containment behavior; expose a small path-based entry point if needed
rather than inventing a concept/stage for an article. Language must be supported
by shared Shiki configuration and match the file type. Registered article code
does not inherit roadmap stage requirements. Both locales use the same snippet
path/language set. Explain verification limits in adjacent prose and review logs.
Fenced code is permitted for clearly labeled pseudocode, configuration, or
non-executable output, using the same server highlighter where applicable.

Repository-authored MDX is trusted source code, not user input. Keep dynamic
business logic out of prose. Citation/figure/snippet attributes must be static
literals (including literal arrays) so the compiler/checker can resolve them.
Do not use dynamic headings, image sources, or citation IDs. F03 establishes the
shared content extraction/rendering integration; F06 adds comprehensive reporting
and CI checks. Server components should report unresolved required inputs clearly
even before the full report exists.

The F03 compiler accepts static Markdown plus `Citation`, `Figure`, and `Snippet`.
It rejects authored imports/exports/expressions, other JSX, Markdown images,
reference-style links, and footnotes. Figures/snippets must be standalone blocks;
citations may be inline. Use inline Markdown links and the citation contract
instead. GFM tables are enabled at build time. Bodies outside the Foundations
locale directories are not transformed by the Foundations plugin.

### Headings and links

The route renders the single H1 from localized metadata. MDX starts at H2 and
uses nested Markdown headings without skipping levels. The table of contents
contains H2/H3 entries in body order; deeper headings may exist without a TOC entry.
Heading text may include inline code or emphasis, but not dynamic JSX/expressions.

One compile-time heading pass supplies both generated heading data and IDs on
rendered headings. Authors do not maintain a parallel heading list. Normalize
visible text with Unicode NFKD, remove combining marks, lowercase, map `đ` to `d`,
replace runs outside Unicode letters/numbers with `-`, and trim outer hyphens.
Use `heading` when the normalized text is empty; prefix the result with `section-`.
If an ID is already used, append the lowest free suffix starting at `-2` to the
base, checking all previously assigned heading IDs. Apply this to all body
headings, not only the TOC subset. This also handles a literal heading that would
collide with an earlier duplicate's suffix. Changing heading text can change its
fragment; existing inbound fragments are not guaranteed across editorial edits.

Related article/concept arrays contain distinct canonical slugs, with no article
self-link. Unknown IDs fail validation. A registered draft may be referenced in
metadata, but public related lists filter it out. Direct MDX links to unpublished
articles are not permitted on published pages. In-body internal links use the
current locale and must resolve, including fragments. Do not derive destinations
from display titles or hardcode an English article link into Vietnamese prose.
Locale switching preserves the article slug and removes a locale-specific fragment.

### Publication and readiness

Drafts may be incomplete but must be structurally valid for the fields and bodies
that are present. They are excluded from public lookups, static parameters, search,
topic lists, sitemap, and related links. Unknown status/topic/locale/technology
values, malformed IDs, and invalid supplied references are errors in any status.

Setting `published` requests validation; it does not bypass it. Publication requires:

1. Valid localized metadata and imported nonempty MDX bodies for both `en` and `vi`.
2. A real review date for each locale and at least one reviewed primary source.
3. Resolved contextual citations and source-set parity, with no unused sources.
4. At least one meaningful figure in each locale, matching figure IDs and valid assets.
5. Valid headings, anchors, internal links, related slugs, and any snippet references;
   shared snippet-path/language parity between locales.
6. Completed manual review of technical scope, source support, translation parity,
   illustration meaning, and code verification limits.

Missing publication requirements fail the build/report with article slug, locale,
file, and field where available; never silently downgrade a requested publication
or serve English as a completed Vietnamese body. A valid published article creates
both locale routes together, with localized canonical/language-alternate metadata.
Its search projection includes slug, topic, title, description, and keywords only;
never MDX functions, full prose, figures, or snippet code.

### Automated checks versus editorial evidence

| Check                 | Mechanically enforceable                                                               | Requires manual/editorial evidence                                                       |
| --------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Registry and metadata | Unique canonical IDs, known enums, text/date shape, body availability, draft exclusion | Appropriate scope, useful topic placement, honest review dates                           |
| Citations             | Resolved IDs, HTTPS URLs, used-reference sets and locale parity                        | Claim support, source authority, version applicability, quotation compliance             |
| Figures               | Asset containment/existence, nonempty alt/caption, stable ID parity                    | Useful diagram, accurate relationships, accessible explanation, attribution/reuse rights |
| Headings and links    | One heading mapping, unique anchors, valid canonical/internal targets                  | Clear reading order and helpful related material                                         |
| Examples              | Paths/regions/languages, locale parity, applicable compiler checks                     | Idiomatic scope, omitted setup, pseudocode labeling, runtime/device guarantees           |
| Localization          | Metadata/body presence and shared reference/figure/snippet sets                        | Accurate natural translation, equivalent technical claims and explanations               |

F03 enforces registry metadata, supplied body structure, source resolution, local
fragment anchors, asset/snippet paths, publication locale readiness, and source/
figure/snippet parity. F04 implements reader behavior and page metadata. F05 supplies
reviewed real content. F06 adds the quality report, internal-link auditing, and CI
integration before F07 exposes discovery. Neither a structural report nor a
compiler check proves the editorial truth of the content.

### Foundations quality reporting (F06)

`bun run content:status` retains the existing concept/stage table and appends a
Foundations table with slug, topic, publication status, EN/VI structural readiness,
and publication-readiness input status. The summary counts registered articles,
published/draft entries, structurally ready entries, and nonempty locale bodies.
It does not count the 48-article editorial budget as existing content or claim
that unregistered catalog entries are complete.

The report reuses schema, source/figure/snippet, and publication checks. Invalid
supplied content is an error in either status. Missing publication inputs in an
unfinished draft are `pending`; requesting `published` makes them errors. A
review date is a checked metadata field, not proof that review happened. The
report can return the first structural error per entry/collection and aggregates
link diagnostics for structurally valid entries.

Internal destinations come from existing concept, recipe, roadmap, and locale
routes plus registered Foundations bodies. Links must use the article locale;
unknown paths/fragments and missing local assets are errors. Self-fragments use
generated heading/source/figure anchors plus actual reader section targets.
Percent-encoded fragments are decoded; a bare `#` is a valid top-of-page link.
Direct links to another registered draft block publication: they are pending in
draft source articles and errors in published sources. Metadata related lists
may still contain registered drafts because the reader filters those entries.

After a fresh build, `bun run content:status --strict --built` reads literal DOM
IDs from generated `.next/server/app` HTML. It checks published article anchors
even when the body has no self-links, and checks cross-page fragments against
their target pages. A missing build artifact is reported as a `build` issue,
separate from an unknown fragment. Runtime-only destinations without generated
HTML cannot have their fragments certified by this offline check. Without
`--built`, a cross-page fragment requiring rendered evidence reports that the
build check is needed. Local SVG link fragments are checked directly against
their asset IDs.

`--strict` exits 1 for incomplete required concept/stage cells or any Foundations
error. Pending drafts alone do not fail it. CI runs strict structural checks before
tests and the built-anchor check after the site build. This configures CI; it does
not claim that a remote job ran successfully. All checks are offline; external
HTTP availability, technical/source truth, and translation fidelity remain
separate checks rather than being inferred from URL syntax or a network outage.

Entry points: [report and link audit](../src/lib/content/foundation-status.ts),
[shared publication/anchor contracts](../src/lib/content/foundation-schema.ts),
[CLI](../scripts/content-status.ts), and [shared Bun MDX loader](../scripts/mdx-loader.ts).

### F03 implementation entry points

- [content registry](../content/foundations/index.ts): contains the reviewed bilingual A03 draft, excluded from public projections until F07; synthetic fixtures remain outside the registry.
- [server loader](../src/lib/content/foundations.ts): `getFoundationArticles(locale)`, `getFoundationArticle(slug, locale)`, and `getRelatedFoundationArticles(article)` expose published articles only.
- [schema](../src/lib/content/foundation-schema.ts): `validateFoundationDefinitions` normalizes unknown inputs and checks supplied compiled bodies; its optional public-root argument supports isolated fixture validation.
- [MDX plugin](../scripts/remark-foundations.mjs): assigns heading IDs and exports `foundation` data containing headings, citation IDs, figures, snippets, links, and a nonempty-body flag. H2/H3 headings form the TOC projection.
- [server bindings](../src/components/foundations/foundation-body.tsx): `FoundationBody` resolves article-specific components and shared Shiki highlighting; `FoundationReferences` reuses the reference list with source anchors.
- [index route](../app/[locale]/foundations/page.tsx) and [reader route](../app/[locale]/foundations/[slug]/page.tsx): localized metadata, published-only static article parameters, and not-found handling. The index groups articles by topic and order. The reader composes generated H2/H3 navigation, the body, references, and localized related links; Markdown blockquotes use the existing informational callout and tables use a labeled keyboard-scroll region.
- [snippet loader](../src/lib/content/snippets.ts): `loadSnippetPath(path, language)` reuses root containment and display-region extraction without a synthetic concept/stage.

The compiler and GFM plugin are build/test dependencies. They do not process
content in the browser. Fixture modules and synthetic review metadata live under
`src/test/fixtures/foundations/`; they have no permanent public routes or entries.

See [FOUNDATIONS-ARTICLE-SPEC.md](FOUNDATIONS-ARTICLE-SPEC.md) for a pilot blueprint
covering both locales, source IDs, figures, and the editorial review boundary.
