import "server-only";
import { readFileSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { getConcepts } from "@/lib/content/concepts";
import { getRecipes } from "@/lib/content/recipes";
import { getRoadmaps, getRoadmapLessonLocations } from "@/lib/content/roadmaps";
import {
  getFoundationAnchors,
  getFoundationPublicationIssues,
  validateFoundationDefinitions,
} from "@/lib/content/foundation-schema";
import { LOCALES, type Locale } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/site";
import { TECHNOLOGY_IDS } from "@/types/technology";
import type { FoundationDefinition, FoundationTopic } from "@/types/foundation";

type LocaleReadiness = {
  metadata: boolean;
  body: boolean;
  reviewed: boolean;
  state: "ready" | "incomplete" | "invalid";
};
export type FoundationStatusIssue = {
  slug: string;
  locale?: Locale;
  severity: "error" | "pending";
  kind: "schema" | "publication" | "link" | "asset" | "build";
  message: string;
};
export type FoundationStatusReport = {
  articles: readonly {
    slug: string;
    topic: FoundationTopic;
    status: FoundationDefinition["metadata"]["status"];
    publicationReady: boolean;
    locales: Readonly<Record<Locale, LocaleReadiness>>;
  }[];
  issues: readonly FoundationStatusIssue[];
};
type FoundationStatusOptions = {
  conceptSlugs: ReadonlySet<string>;
  routes: ReadonlySet<string>;
  publicRoot?: string;
  /** Required for fragments outside Foundations; also audits rendered published-article anchors. */
  pageAnchors?: (path: string) => ReadonlySet<string> | undefined;
};

/** Public locale routes derived from the same content registries used by their pages. */
export function getFoundationLinkRoutes(): ReadonlySet<string> {
  const paths = [
    "",
    "/bookmarks",
    "/compare",
    "/dictionary",
    "/recipes",
    "/foundations",
  ];
  paths.push(
    ...getConcepts().flatMap(({ slug }) => [
      `/compare/${slug}`,
      `/dictionary/${slug}`,
    ]),
  );
  paths.push(...getRecipes().map(({ slug }) => `/recipes/${slug}`));
  for (const source of TECHNOLOGY_IDS)
    for (const target of TECHNOLOGY_IDS) {
      if (source !== target) paths.push(`/learn/${source}/${target}`);
    }
  paths.push(
    ...getRoadmaps().flatMap((roadmap) =>
      getRoadmapLessonLocations(roadmap).map(
        ({ lesson }) =>
          `/learn/${roadmap.source}/${roadmap.target}/${lesson.conceptSlug}`,
      ),
    ),
  );
  return new Set(
    LOCALES.flatMap((locale) => paths.map((path) => `/${locale}${path}`)),
  );
}

/** Extracts literal DOM IDs from generated HTML or repository-owned SVG, not encoded code examples. */
export function getMarkupAnchors(markup: string): ReadonlySet<string> {
  return new Set(
    [...markup.matchAll(/(?:^|\s)id\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      (match) => match[1] ?? match[2],
    ),
  );
}

export function readBuiltPageAnchors(
  path: string,
  buildRoot = resolve(".next/server/app"),
): ReadonlySet<string> | undefined {
  const file = resolve(buildRoot, path.slice(1) + ".html");
  const inside = relative(buildRoot, file);
  if (isAbsolute(inside) || inside.startsWith("..")) return undefined;
  try {
    return getMarkupAnchors(readFileSync(file, "utf8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return undefined;
    throw error;
  }
}

function linkIssues(
  entry: FoundationDefinition,
  locale: Locale,
  definitions: readonly FoundationDefinition[],
  options: FoundationStatusOptions,
): FoundationStatusIssue[] {
  const data = entry.bodies[locale]?.foundation;
  if (!data) return [];
  const issues: FoundationStatusIssue[] = [];
  const slug = entry.metadata.slug;
  const page = `/${locale}/foundations/${slug}`;
  const origin = new URL(SITE_URL).origin;
  function issue(
    kind: FoundationStatusIssue["kind"],
    message: string,
    severity: FoundationStatusIssue["severity"] = "error",
  ) {
    issues.push({ slug, locale, kind, severity, message });
  }
  function articleAnchors(target: FoundationDefinition) {
    const hasRelated = target.metadata.relatedArticles.some((related) =>
      definitions.some(
        (candidate) =>
          candidate.metadata.slug === related &&
          candidate.metadata.status === "published" &&
          candidate.bodies[locale],
      ),
    );
    return getFoundationAnchors(
      target.metadata,
      target.bodies[locale]!.foundation,
      hasRelated,
    );
  }
  const builtSource =
    entry.metadata.status === "published"
      ? options.pageAnchors?.(page)
      : undefined;
  if (entry.metadata.status === "published" && options.pageAnchors) {
    if (!builtSource)
      issue("build", "built page unavailable; run a fresh build: " + page);
    else
      for (const anchor of articleAnchors(entry)) {
        if (!builtSource.has(anchor))
          issue(
            "link",
            "rendered article is missing anchor: " + page + "#" + anchor,
          );
      }
  }
  for (const href of new Set(data.links)) {
    let url: URL;
    let path: string;
    let fragment: string;
    try {
      url = new URL(href, origin + page);
      path = decodeURI(url.pathname).replace(/\/$/, "");
      fragment = decodeURIComponent(url.hash.slice(1));
    } catch {
      issue("link", "invalid URL or encoding: " + href);
      continue;
    }
    if (["mailto:", "tel:"].includes(url.protocol)) continue;
    if (!["http:", "https:"].includes(url.protocol)) {
      issue("link", "unsupported link protocol: " + href);
      continue;
    }
    if (url.origin !== origin) continue;
    const pageLocale = path.split("/")[1];
    if (
      LOCALES.some((candidate) => candidate === pageLocale) &&
      pageLocale !== locale &&
      (options.routes.has(path) ||
        path.startsWith(`/${pageLocale}/foundations/`))
    ) {
      issue("link", "internal page must use the article locale: " + href);
      continue;
    }
    const target = definitions.find(
      (candidate) =>
        path === `/${locale}/foundations/${candidate.metadata.slug}`,
    );
    let anchors: ReadonlySet<string> | undefined;
    if (target) {
      if (!target.bodies[locale]) {
        issue("link", "target has no locale body: " + href);
        continue;
      }
      if (path !== page && target.metadata.status !== "published") {
        issue(
          "link",
          "article target is unpublished: " + href,
          entry.metadata.status === "published" ? "error" : "pending",
        );
      }
      anchors = articleAnchors(target);
      if (target.metadata.status === "published" && options.pageAnchors) {
        anchors = path === page ? builtSource : options.pageAnchors(path);
        if (!anchors) {
          issue("build", "built page unavailable; run a fresh build: " + path);
          continue;
        }
      }
    } else if (options.routes.has(path)) {
      if (fragment) {
        anchors = options.pageAnchors?.(path);
        if (!anchors) {
          issue(
            "build",
            "fragment needs built page anchors; run build and content:status --built: " +
              href,
          );
          continue;
        }
      }
    } else {
      const root = resolve(options.publicRoot ?? "public");
      const file = resolve(root, path.slice(1));
      const inside = relative(root, file);
      if (isAbsolute(inside) || inside.startsWith("..")) {
        issue("asset", "asset escapes public directory: " + href);
        continue;
      }
      try {
        if (!statSync(file).isFile()) {
          issue("link", "unknown internal destination: " + href);
          continue;
        }
        if (fragment) {
          if (!path.endsWith(".svg")) {
            issue("asset", "unsupported asset fragment: " + href);
            continue;
          }
          anchors = getMarkupAnchors(readFileSync(file, "utf8"));
        }
      } catch (error) {
        if (!(
          error instanceof Error &&
          "code" in error &&
          error.code === "ENOENT"
        ))
          throw error;
        issue(
          /\.[a-z0-9]+$/i.test(path) ? "asset" : "link",
          "missing local destination: " + href,
        );
        continue;
      }
    }
    if (fragment && anchors && !anchors.has(fragment))
      issue("link", "unknown target fragment: " + href);
  }
  return issues;
}

/** Offline structural audit. Incomplete drafts are pending; invalid supplied content and published gaps are errors. */
export function getFoundationStatus(
  definitions: readonly FoundationDefinition[],
  options: FoundationStatusOptions,
): FoundationStatusReport {
  const issues: FoundationStatusIssue[] = [];
  const normalized: FoundationDefinition[] = [];
  const articleSlugs = new Set(
    definitions.map((entry) => entry.metadata.slug.trim()),
  );
  for (const entry of definitions) {
    try {
      // Keep original relation metadata for reader anchors; audit collection integrity below.
      const [validated] = validateFoundationDefinitions(
        [
          {
            ...entry,
            metadata: {
              ...entry.metadata,
              status:
                entry.metadata.status === "published"
                  ? "draft"
                  : entry.metadata.status,
            },
          },
        ],
        options.conceptSlugs,
        options.publicRoot,
        articleSlugs,
      );
      normalized.push({
        ...validated,
        metadata: {
          ...validated.metadata,
          status: entry.metadata.status,
        },
      });
    } catch (error) {
      issues.push({
        slug: entry.metadata.slug.trim(),
        severity: "error",
        kind: "schema",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  try {
    validateFoundationDefinitions(
      normalized.map((entry) => ({
        ...entry,
        metadata: { ...entry.metadata, status: "draft" },
      })),
      options.conceptSlugs,
      options.publicRoot,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const index = message.match(/^foundations\[(\d+)\]/)?.[1];
    const slug =
      message.match(/^foundations\.([a-z0-9-]+):/)?.[1] ??
      (index ? normalized[Number(index)]?.metadata.slug : undefined) ??
      "registry";
    issues.push({ slug, severity: "error", kind: "schema", message });
  }
  for (const entry of normalized) {
    for (const missing of getFoundationPublicationIssues(entry)) {
      issues.push({
        slug: entry.metadata.slug,
        ...missing,
        kind: "publication",
        severity: entry.metadata.status === "published" ? "error" : "pending",
      });
    }
    for (const locale of LOCALES)
      issues.push(...linkIssues(entry, locale, normalized, options));
  }
  const articles = definitions.map((entry) => {
    const slug = entry.metadata.slug.trim();
    function readiness(locale: Locale): LocaleReadiness {
      const relevant = issues.filter(
        (issue) =>
          issue.slug === slug && (!issue.locale || issue.locale === locale),
      );
      return {
        metadata: Boolean(entry.metadata.locales[locale]),
        body: Boolean(entry.bodies[locale]?.foundation.hasContent),
        reviewed: Boolean(entry.metadata.locales[locale]?.reviewedAt),
        state: relevant.some((issue) => issue.severity === "error")
          ? "invalid"
          : relevant.length
            ? "incomplete"
            : "ready",
      };
    }
    const locales = { en: readiness("en"), vi: readiness("vi") };
    return {
      slug,
      topic: entry.metadata.topic,
      status: entry.metadata.status,
      publicationReady: LOCALES.every(
        (locale) => locales[locale].state === "ready",
      ),
      locales,
    };
  });
  return { articles, issues };
}

export function formatFoundationStatus({
  articles,
  issues,
}: FoundationStatusReport): string {
  const errors = issues.filter((issue) => issue.severity === "error").length;
  const published = articles.filter(
    (entry) => entry.status === "published",
  ).length;
  const bodies = articles.reduce(
    (count, entry) =>
      count + LOCALES.filter((locale) => entry.locales[locale].body).length,
    0,
  );
  return [
    ["article", "topic", "status", ...LOCALES, "publication-ready"].join("\t"),
    ...articles
      .toSorted((a, b) => a.slug.localeCompare(b.slug))
      .map((entry) =>
        [
          entry.slug,
          entry.topic,
          entry.status,
          ...LOCALES.map((locale) => entry.locales[locale].state),
          entry.publicationReady ? "yes" : "no",
        ].join("\t"),
      ),
    `Foundation registry: ${articles.length} articles; published: ${published}; drafts: ${articles.length - published}; structurally ready: ${articles.filter((entry) => entry.publicationReady).length}; nonempty bodies: ${bodies}/${articles.length * LOCALES.length}; errors: ${errors}; pending: ${issues.length - errors}.`,
    ...issues.map(
      (issue) =>
        `${issue.severity}\t${issue.kind}\t${issue.slug}${issue.locale ? "." + issue.locale : ""}\t${issue.message}`,
    ),
    "Structural checks do not verify technical claims, source support, or translation quality. External availability is not checked.",
  ].join("\n");
}
