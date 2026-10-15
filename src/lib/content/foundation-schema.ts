import "server-only";
import { statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import type { MDXContent } from "mdx/types";
import { LOCALES } from "@/lib/i18n/locale";
import { CONTENT_REFERENCE_KINDS } from "@/types/concept";
import {
  FOUNDATION_TOPICS,
  MOBILE_PLATFORMS,
  type FoundationArticleMetadata,
  type FoundationBodyData,
  type FoundationBodyModule,
  type FoundationDefinition,
  type FoundationLocaleMetadata,
  type FoundationReference,
} from "@/types/foundation";
import { CODE_LANGUAGES, TECHNOLOGY_IDS } from "@/types/technology";
import { loadSnippetPath } from "@/lib/content/snippets";
import {
  ContentValidationError,
  readLiteral,
  readRecord,
  readString,
} from "@/lib/content/validation";

function fail(path: string, message: string): never {
  throw new ContentValidationError(path, message);
}

function keys(
  record: Record<string, unknown>,
  allowed: readonly string[],
  path: string,
) {
  for (const key of Object.keys(record)) {
    if (!allowed.includes(key)) fail(path + "." + key, "unknown field");
  }
}

function array(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) fail(path, "expected an array");
  return value;
}

function strings(value: unknown, path: string): string[] {
  const values = array(value, path).map((item, index) =>
    readString(item, path + "[" + index + "]"),
  );
  if (
    new Set(values.map((item) => item.toLowerCase())).size !== values.length
  ) {
    fail(path, "contains duplicate values");
  }
  return values;
}

function identifier(value: unknown, path: string): string {
  const result = readString(value, path);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result))
    fail(path, "expected a kebab-case identifier");
  return result;
}

function identifiers(value: unknown, path: string): string[] {
  return strings(value, path).map((item, index) =>
    identifier(item, path + "[" + index + "]"),
  );
}

function date(value: unknown, path: string): string {
  const text = readString(value, path);
  const parsed = new Date(text + "T00:00:00.000Z");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(text) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== text ||
    text > new Date().toISOString().slice(0, 10)
  )
    fail(path, "expected a real ISO date not in the future");
  return text;
}

function platforms(value: unknown, path: string) {
  const entries = strings(value, path).map((item) =>
    readLiteral(item, MOBILE_PLATFORMS, path),
  );
  if (!entries.length) fail(path, "expected at least one platform");
  return entries;
}

function reference(value: unknown, path: string): FoundationReference {
  const item = readRecord(value, path);
  keys(
    item,
    [
      "id",
      "title",
      "url",
      "kind",
      "verifiedAt",
      "version",
      "technology",
      "platforms",
    ],
    path,
  );
  const url = readString(item.url, path + ".url");
  try {
    if (new URL(url).protocol !== "https:")
      fail(path + ".url", "expected HTTPS");
  } catch {
    fail(path + ".url", "expected a valid HTTPS URL");
  }
  return {
    id: identifier(item.id, path + ".id"),
    title: readString(item.title, path + ".title"),
    url,
    kind: readLiteral(item.kind, CONTENT_REFERENCE_KINDS, path + ".kind"),
    verifiedAt: date(item.verifiedAt, path + ".verifiedAt"),
    ...(item.version === undefined
      ? {}
      : { version: readString(item.version, path + ".version") }),
    ...(item.technology === undefined
      ? {}
      : {
          technology: readLiteral(
            item.technology,
            TECHNOLOGY_IDS,
            path + ".technology",
          ),
        }),
    ...(item.platforms === undefined
      ? {}
      : { platforms: platforms(item.platforms, path + ".platforms") }),
  };
}

function metadata(value: unknown, path: string): FoundationArticleMetadata {
  const item = readRecord(value, path);
  keys(
    item,
    [
      "slug",
      "topic",
      "order",
      "status",
      "platforms",
      "technologies",
      "locales",
      "references",
      "relatedArticles",
      "relatedConcepts",
    ],
    path,
  );
  if (
    typeof item.order !== "number" ||
    !Number.isInteger(item.order) ||
    item.order < 0
  ) {
    fail(path + ".order", "expected a non-negative integer");
  }
  const localizations = readRecord(item.locales, path + ".locales");
  keys(localizations, LOCALES, path + ".locales");
  const locales: FoundationArticleMetadata["locales"] = {};
  for (const locale of LOCALES) {
    if (localizations[locale] === undefined) continue;
    const localePath = path + ".locales." + locale;
    const localized = readRecord(localizations[locale], localePath);
    keys(
      localized,
      ["title", "description", "keywords", "reviewedAt"],
      localePath,
    );
    const normalized: FoundationLocaleMetadata = {
      title: readString(localized.title, localePath + ".title"),
      description: readString(
        localized.description,
        localePath + ".description",
      ),
      keywords: strings(localized.keywords, localePath + ".keywords"),
      ...(localized.reviewedAt === undefined
        ? {}
        : {
            reviewedAt: date(localized.reviewedAt, localePath + ".reviewedAt"),
          }),
    };
    locales[locale] = normalized;
  }
  const references = array(item.references, path + ".references").map(
    (entry, index) => reference(entry, path + ".references[" + index + "]"),
  );
  if (new Set(references.map((entry) => entry.id)).size !== references.length)
    fail(path + ".references", "duplicate source ID");
  if (
    new Set(references.map((entry) => new URL(entry.url).href)).size !==
    references.length
  )
    fail(path + ".references", "duplicate source URL");
  return {
    slug: identifier(item.slug, path + ".slug"),
    topic: readLiteral(item.topic, FOUNDATION_TOPICS, path + ".topic"),
    order: item.order,
    status: readLiteral(item.status, ["draft", "published"], path + ".status"),
    platforms: platforms(item.platforms, path + ".platforms"),
    ...(item.technologies === undefined
      ? {}
      : {
          technologies: strings(item.technologies, path + ".technologies").map(
            (entry) =>
              readLiteral(entry, TECHNOLOGY_IDS, path + ".technologies"),
          ),
        }),
    locales,
    references,
    relatedArticles: identifiers(
      item.relatedArticles,
      path + ".relatedArticles",
    ),
    relatedConcepts: identifiers(
      item.relatedConcepts,
      path + ".relatedConcepts",
    ),
  };
}

function validateFigureAsset(
  src: string,
  slug: string,
  publicRoot: string,
  path: string,
) {
  const prefix = "/illustrations/foundations/" + slug + "/";
  if (!src.startsWith(prefix))
    fail(path, "expected an article-owned illustration path");
  const root = resolve(publicRoot, "illustrations/foundations", slug);
  const file = resolve(publicRoot, src.slice(1));
  const contained = relative(root, file);
  if (isAbsolute(contained) || contained.startsWith(".."))
    fail(path, "illustration escapes article directory");
  try {
    if (!statSync(file).isFile()) fail(path, "illustration is not a file");
  } catch {
    fail(path, "illustration file is missing");
  }
}

function body(
  value: unknown,
  article: FoundationArticleMetadata,
  publicRoot: string,
  path: string,
): FoundationBodyModule {
  const bodyModule = readRecord(value, path);
  if (typeof bodyModule.default !== "function")
    fail(path + ".default", "expected an imported MDX component");
  const data = readRecord(bodyModule.foundation, path + ".foundation");
  keys(
    data,
    ["headings", "citations", "figures", "snippets", "links", "hasContent"],
    path + ".foundation",
  );
  if (typeof data.hasContent !== "boolean")
    fail(path, "missing compiler content flag");
  const headings = array(data.headings, path + ".headings").map(
    (value, index) => {
      const itemPath = path + ".headings[" + index + "]";
      const item = readRecord(value, itemPath);
      const id = readString(item.id, itemPath + ".id");
      if (!/^section-[\p{L}\p{N}-]+$/u.test(id))
        fail(itemPath, "invalid generated heading ID");
      if (
        typeof item.level !== "number" ||
        !Number.isInteger(item.level) ||
        item.level < 2 ||
        item.level > 6
      )
        fail(itemPath, "invalid heading level");
      return {
        id,
        text: readString(item.text, itemPath + ".text"),
        level: item.level,
      };
    },
  );
  if (new Set(headings.map((entry) => entry.id)).size !== headings.length)
    fail(path, "duplicate heading ID");
  const sources = new Set(article.references.map((entry) => entry.id));
  const checkSources = (values: readonly string[]) => {
    for (const source of values)
      if (!sources.has(source))
        fail(path, "unknown citation source: " + source);
  };
  // Repeated contextual citations are intentional.
  const citations = array(data.citations, path + ".citations").map((entry) =>
    identifier(entry, path + ".citations"),
  );
  checkSources(citations);
  const figures = array(data.figures, path + ".figures").map((value, index) => {
    const itemPath = path + ".figures[" + index + "]";
    const item = readRecord(value, itemPath);
    const figure = {
      id: identifier(item.id, itemPath + ".id"),
      src: readString(item.src, itemPath + ".src"),
      alt: readString(item.alt, itemPath + ".alt"),
      caption: readString(item.caption, itemPath + ".caption"),
      sources: identifiers(item.sources, itemPath + ".sources"),
    };
    checkSources(figure.sources);
    validateFigureAsset(
      figure.src,
      article.slug,
      publicRoot,
      itemPath + ".src",
    );
    return figure;
  });
  if (new Set(figures.map((entry) => entry.id)).size !== figures.length)
    fail(path, "duplicate figure ID");
  const snippets = array(data.snippets, path + ".snippets").map(
    (value, index) => {
      const itemPath = path + ".snippets[" + index + "]";
      const item = readRecord(value, itemPath);
      const snippet = {
        path: readString(item.path, itemPath + ".path"),
        language: readLiteral(
          item.language,
          CODE_LANGUAGES,
          itemPath + ".language",
        ),
      };
      loadSnippetPath(snippet.path, snippet.language);
      return snippet;
    },
  );
  const links = array(data.links, path + ".links").map((entry) =>
    readString(entry, path + ".links"),
  );
  const foundation: FoundationBodyData = {
    headings,
    citations,
    figures,
    snippets,
    links,
    hasContent: data.hasContent,
  };
  const anchors = getFoundationAnchors(article, foundation);
  for (const link of links) {
    if (!link.startsWith("#") || link === "#") continue;
    let fragment: string;
    try {
      fragment = decodeURIComponent(link.slice(1));
    } catch {
      fail(path + ".links", "invalid fragment encoding: " + link);
    }
    if (!anchors.has(fragment))
      fail(path + ".links", "unknown fragment: " + link);
  }
  return {
    default: bodyModule.default as MDXContent,
    foundation,
  };
}

/** Reader-owned targets supplement the anchors emitted by the MDX compiler. */
export function getFoundationAnchors(
  article: FoundationArticleMetadata,
  data: FoundationBodyData,
  hasRelatedArticles = article.relatedArticles.length > 0,
): ReadonlySet<string> {
  return new Set([
    "main-content",
    ...data.headings.map((entry) => entry.id),
    ...article.references.map((entry) => "source-" + entry.id),
    ...data.figures.map((entry) => "figure-" + entry.id),
    ...(article.references.length ? ["references-title"] : []),
    ...(article.relatedConcepts.length ? ["related-concepts-title"] : []),
    ...(hasRelatedArticles ? ["related-articles-title"] : []),
  ]);
}

function sameSet(left: readonly string[], right: readonly string[]) {
  const a = new Set(left);
  const b = new Set(right);
  return a.size === b.size && [...a].every((value) => b.has(value));
}

export type FoundationPublicationIssue = {
  locale?: (typeof LOCALES)[number];
  message: string;
};

/** Structural publication requirements; presence of review dates is not evidence of editorial truth. */
export function getFoundationPublicationIssues({
  metadata: article,
  bodies,
}: FoundationDefinition): readonly FoundationPublicationIssue[] {
  const issues: FoundationPublicationIssue[] = [];
  for (const locale of LOCALES) {
    const current = bodies[locale]?.foundation;
    if (!article.locales[locale]?.reviewedAt)
      issues.push({
        locale,
        message: "published locale needs an editorial review date",
      });
    if (!current?.hasContent)
      issues.push({
        locale,
        message: "published locale needs a nonempty MDX body",
      });
    if (!current) continue;
    if (!current.figures.length)
      issues.push({ locale, message: "published locale needs a figure" });
    if (
      !sameSet(
        [
          ...current.citations,
          ...current.figures.flatMap((entry) => entry.sources),
        ],
        article.references.map((entry) => entry.id),
      )
    )
      issues.push({
        locale,
        message: "published source set contains unused references",
      });
  }
  if (!article.references.some((entry) => entry.kind !== "further-reading"))
    issues.push({ message: "published article needs a primary source" });
  const en = bodies.en?.foundation;
  const vi = bodies.vi?.foundation;
  if (en && vi) {
    if (
      !sameSet(
        en.figures.map((entry) => entry.id),
        vi.figures.map((entry) => entry.id),
      )
    )
      issues.push({ message: "locale figure IDs differ" });
    if (
      !sameSet(
        en.snippets.map((entry) => entry.path + ":" + entry.language),
        vi.snippets.map((entry) => entry.path + ":" + entry.language),
      )
    )
      issues.push({ message: "locale snippet references differ" });
  }
  return issues;
}

/** Validates supplied bodies and metadata. Isolated audits may supply the enclosing registry's article IDs. */
export function validateFoundationDefinitions(
  value: unknown,
  conceptSlugs: ReadonlySet<string>,
  publicRoot = resolve(process.cwd(), "public"),
  articleSlugs?: ReadonlySet<string>,
): readonly FoundationDefinition[] {
  const seen = new Set<string>();
  const definitions = array(value, "foundations").map((value, index) => {
    const path = "foundations[" + index + "]";
    const item = readRecord(value, path);
    keys(item, ["metadata", "bodies"], path);
    const article = metadata(item.metadata, path + ".metadata");
    if (seen.has(article.slug))
      fail(path + ".metadata.slug", "duplicate article slug: " + article.slug);
    seen.add(article.slug);
    const bodyMap = readRecord(item.bodies, path + ".bodies");
    keys(bodyMap, LOCALES, path + ".bodies");
    const bodies: FoundationDefinition["bodies"] = {};
    for (const locale of LOCALES) {
      const localePath = path + "." + article.slug + ".bodies." + locale;
      if (bodyMap[locale] !== undefined) {
        if (!article.locales[locale])
          fail(localePath, "body has no localized metadata");
        bodies[locale] = body(bodyMap[locale], article, publicRoot, localePath);
      }
    }
    if (article.status === "published") {
      const issue = getFoundationPublicationIssues({
        metadata: article,
        bodies,
      })[0];
      if (issue)
        fail(
          issue.locale
            ? path + "." + article.slug + ".bodies." + issue.locale
            : path,
          issue.message,
        );
    }
    return { metadata: article, bodies };
  });
  for (const { metadata: article } of definitions) {
    const path = "foundations." + article.slug;
    for (const slug of article.relatedArticles) {
      if (slug === article.slug || !(articleSlugs ?? seen).has(slug))
        fail(path, "unknown or self-related article: " + slug);
    }
    for (const slug of article.relatedConcepts) {
      if (!conceptSlugs.has(slug))
        fail(path, "unknown related concept: " + slug);
    }
  }
  return definitions.sort(
    (a, b) =>
      a.metadata.order - b.metadata.order ||
      a.metadata.slug.localeCompare(b.metadata.slug),
  );
}
