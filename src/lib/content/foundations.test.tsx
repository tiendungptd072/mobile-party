import { beforeAll, describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { renderToReadableStream } from "react-dom/server";
import remarkFoundations from "../../../scripts/remark-foundations.mjs";
import {
  FoundationBody,
  FoundationReferences,
} from "@/components/foundations/foundation-body";
import { validateFoundationDefinitions } from "@/lib/content/foundation-schema";
import {
  createFoundationCollection,
  getFoundationArticles,
  getFoundationArticle,
} from "@/lib/content/foundations";
import { loadSnippetPath } from "@/lib/content/snippets";
import type { FoundationDefinition } from "@/types/foundation";
import type { Locale } from "@/types/locale";
import { fixtureMetadata } from "@/test/fixtures/foundations/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { getTechnologyById } from "@/lib/content/technologies";

const fixtureRoot = resolve("src/test/fixtures/foundations");
const concepts = new Set(["state-restoration"]);
let valid: FoundationDefinition;

async function compile(source: string, locale: Locale = "en") {
  return evaluate(
    { value: source, path: resolve(fixtureRoot, locale, "pipeline.mdx") },
    { ...runtime, remarkPlugins: [remarkGfm, remarkFoundations] },
  );
}

function validate(value: unknown) {
  return validateFoundationDefinitions(value, concepts, fixtureRoot);
}

function fixture(): FoundationDefinition {
  return {
    metadata: structuredClone(valid.metadata),
    bodies: Object.fromEntries(
      Object.entries(valid.bodies).map(([locale, body]) => [
        locale,
        { default: body.default, foundation: structuredClone(body.foundation) },
      ]),
    ),
  };
}

beforeAll(async () => {
  const en = await compile(
    readFileSync(resolve(fixtureRoot, "en/pipeline.mdx"), "utf8"),
  );
  const vi = await compile(
    readFileSync(resolve(fixtureRoot, "vi/pipeline.mdx"), "utf8"),
    "vi",
  );
  [valid] = validate([{ metadata: fixtureMetadata, bodies: { en, vi } }]);
});

describe("Foundations MDX pipeline", () => {
  test.each(["en", "vi"] as const)(
    "renders the real compiled %s body with shared server components",
    async (locale) => {
      const collection = createFoundationCollection(validate([fixture()]));
      const article = collection.getArticle("pipeline-fixture", locale)!;
      const html = await new Response(
        await renderToReadableStream(
          <>
            <FoundationBody article={article} />
            <FoundationReferences article={article} />
          </>,
        ),
      ).text();
      const first =
        locale === "en"
          ? "section-shared-state"
          : "section-trang-thai-dung-chung";
      expect(html).toContain('id="' + first + '"');
      expect(html).toContain('id="' + first + '-2"');
      expect(html).toContain('id="' + first + '-2-2"');
      expect(html).toContain('href="#' + first + '"');
      expect(html).toContain("<table>");
      expect(html).toContain('href="#source-fixture-source"');
      expect(html).toContain('id="source-fixture-source"');
      expect(html).toContain(getTechnologyById("kotlin")!.name);
      expect(html).toContain('id="figure-flow"');
      expect(html).toContain(article.body.foundation.figures[0].alt);
      expect(html).toContain("shiki");
      expect(html).toContain("ProfileViewModel");
      expect(html).not.toContain("#region show");
      expect(html).not.toContain("package snippets");
      expect(
        article.body.foundation.headings.filter(
          (heading) => heading.level <= 3,
        ),
      ).toHaveLength(4);
    },
  );

  test("excludes drafts from lists, direct lookup, and related discovery", () => {
    const published = fixture();
    const draft: FoundationDefinition = {
      metadata: {
        ...fixture().metadata,
        slug: "draft-fixture",
        status: "draft",
        locales: {},
        references: [],
        relatedArticles: [],
      },
      bodies: {},
    };
    published.metadata.relatedArticles = ["draft-fixture"];
    const collection = createFoundationCollection(validate([draft, published]));
    expect(collection.getArticles("en")).toHaveLength(1);
    expect(collection.getArticle("draft-fixture", "vi")).toBeUndefined();
    expect(
      collection.getRelatedArticles(
        collection.getArticle("pipeline-fixture", "en")!,
      ),
    ).toEqual([]);
    expect(getFoundationArticles("en")).toEqual([]);
    expect(getFoundationArticles("vi")).toEqual([]);
    expect(getFoundationArticle("pipeline-fixture", "en")).toBeUndefined();
  });

  test("rejects duplicate slugs before public projection", () => {
    expect(() => validate([fixture(), fixture()])).toThrow(
      "duplicate article slug",
    );
  });

  const invalid: [string, (value: FoundationDefinition) => void, string][] = [
    [
      "fractional order",
      (entry) => {
        entry.metadata.order = 0.5;
      },
      "non-negative integer",
    ],
    [
      "empty OS scope",
      (entry) => {
        entry.metadata.platforms = [];
      },
      "at least one platform",
    ],
    [
      "invalid date",
      (entry) => {
        entry.metadata.references[0].verifiedAt = "2025-02-30";
      },
      "real ISO date",
    ],
    [
      "future review",
      (entry) => {
        entry.metadata.locales.en!.reviewedAt = "2999-01-01";
      },
      "real ISO date",
    ],
    [
      "HTTP source",
      (entry) => {
        entry.metadata.references[0].url = "http://example.com";
      },
      "HTTPS",
    ],
    [
      "duplicate source ID",
      (entry) => {
        entry.metadata.references = [
          ...entry.metadata.references,
          { ...entry.metadata.references[0], url: "https://example.com/other" },
        ];
      },
      "duplicate source ID",
    ],
    [
      "duplicate source URL",
      (entry) => {
        entry.metadata.references = [
          ...entry.metadata.references,
          { ...entry.metadata.references[0], id: "other-source" },
        ];
      },
      "duplicate source URL",
    ],
    [
      "unknown concept",
      (entry) => {
        entry.metadata.relatedConcepts = ["unknown"];
      },
      "unknown related concept",
    ],
    [
      "unknown article",
      (entry) => {
        entry.metadata.relatedArticles = ["unknown"];
      },
      "unknown or self-related article",
    ],
    [
      "self relation",
      (entry) => {
        entry.metadata.relatedArticles = ["pipeline-fixture"];
      },
      "unknown or self-related article",
    ],
    [
      "missing VI body",
      (entry) => {
        delete entry.bodies.vi;
      },
      "nonempty MDX body",
    ],
    [
      "missing VI metadata",
      (entry) => {
        delete entry.metadata.locales.vi;
      },
      "no localized metadata",
    ],
    [
      "missing review",
      (entry) => {
        delete entry.metadata.locales.en!.reviewedAt;
      },
      "editorial review",
    ],
    [
      "empty body",
      (entry) => {
        entry.bodies.en!.foundation.hasContent = false;
      },
      "nonempty MDX body",
    ],
    [
      "unknown citation",
      (entry) => {
        entry.bodies.en!.foundation.citations = ["missing-source"];
      },
      "unknown citation",
    ],
    [
      "unused source",
      (entry) => {
        entry.metadata.references = [
          ...entry.metadata.references,
          {
            ...entry.metadata.references[0],
            id: "unused",
            url: "https://example.com/unused",
          },
        ];
      },
      "unused references",
    ],
    [
      "non-primary sources",
      (entry) => {
        entry.metadata.references[0].kind = "further-reading";
      },
      "primary source",
    ],
    [
      "missing figure",
      (entry) => {
        entry.bodies.en!.foundation.figures = [];
      },
      "needs a figure",
    ],
    [
      "missing asset",
      (entry) => {
        entry.bodies.en!.foundation.figures[0].src =
          "/illustrations/foundations/pipeline-fixture/absent.svg";
      },
      "file is missing",
    ],
    [
      "asset escape",
      (entry) => {
        entry.bodies.en!.foundation.figures[0].src =
          "/illustrations/foundations/pipeline-fixture/../../../outside.svg";
      },
      "escapes article",
    ],
    [
      "figure parity",
      (entry) => {
        entry.bodies.vi!.foundation.figures[0].id = "different";
      },
      "figure IDs differ",
    ],
    [
      "snippet parity",
      (entry) => {
        entry.bodies.vi!.foundation.snippets = [];
      },
      "snippet references differ",
    ],
    [
      "missing snippet",
      (entry) => {
        entry.bodies.en!.foundation.snippets[0].path =
          "absent/kotlin/production.kt";
      },
      "file is missing",
    ],
    [
      "snippet extension",
      (entry) => {
        entry.bodies.en!.foundation.snippets[0].language = "tsx";
      },
      "extension does not match",
    ],
    [
      "snippet escape",
      (entry) => {
        entry.bodies.en!.foundation.snippets[0].path = "../outside.kt";
      },
      "must stay inside",
    ],
    [
      "broken local fragment",
      (entry) => {
        entry.bodies.en!.foundation.links = ["#missing"];
      },
      "unknown fragment",
    ],
  ];
  test.each(invalid)("rejects %s", (_name, mutate, message) => {
    const entry = fixture();
    mutate(entry);
    expect(() => validate([entry])).toThrow(message);
  });

  test("rejects unknown enum values and fields even on drafts", () => {
    const entry = fixture();
    expect(() =>
      validate([
        { ...entry, metadata: { ...entry.metadata, status: "ready" } },
      ]),
    ).toThrow("expected one of");
    expect(() =>
      validate([
        { ...entry, metadata: { ...entry.metadata, topic: "unknown" } },
      ]),
    ).toThrow("expected one of");
    expect(() =>
      validate([
        {
          ...entry,
          metadata: { ...entry.metadata, technologies: ["unknown"] },
        },
      ]),
    ).toThrow("expected one of");
    expect(() =>
      validate([
        { ...entry, metadata: { ...entry.metadata, locales: { other: {} } } },
      ]),
    ).toThrow("unknown field");
    expect(() =>
      validate([
        { ...entry, metadata: { ...entry.metadata, exercise: "unexpected" } },
      ]),
    ).toThrow("unknown field");
  });

  test.each([
    "## Static\n\n<Citation source={name} />",
    "## Static\n\n<Citation {...props} />",
    '## Static\n\n<Figure id="a" src="/a" alt="a" caption="a" sources={getSources()} />',
    "## Static\n\nexport const metadata = {}",
    "## Static\n\n{Date.now()}",
    "## {title}",
    "# Body title",
    "## Parent\n\n#### Skipped",
    '## Static\n\n<img src="/a" />',
    "## Static\n\n![Untracked image](/a.svg)",
    '## Static\n\nProse <Snippet path="state-restoration/kotlin/production.kt" language="kotlin" />',
    "## Static\n\nSource[^1]\n\n[^1]: https://example.com",
  ])("rejects dynamic or unsupported body syntax: %s", async (source) => {
    await expect(compile(source)).rejects.toThrow();
  });

  test("normalizes Unicode and empty headings and handles literal suffix collisions", async () => {
    const compiled = await compile(
      "## Đổi trạng thái\n\n## Đổi trạng thái\n\n## Đổi trạng thái 2\n\n## !!!",
    );
    expect(compiled.foundation).toMatchObject({
      headings: [
        { id: "section-doi-trang-thai" },
        { id: "section-doi-trang-thai-2" },
        { id: "section-doi-trang-thai-2-2" },
        { id: "section-heading" },
      ],
    });
  });

  test.each(["en", "vi"] as const)(
    "highlights fenced configuration with the %s code label",
    async (locale) => {
      const fence = String.fromCharCode(96).repeat(3);
      const compiled = await compile(
        "## Configuration\n\n" + fence + 'json\n{"enabled": true}\n' + fence,
        locale,
      );
      const [entry] = validate([
        {
          metadata: { ...fixture().metadata, status: "draft", references: [] },
          bodies: { [locale]: compiled },
        },
      ]);
      const article = {
        metadata: entry.metadata,
        localized: entry.metadata.locales[locale]!,
        locale,
        body: entry.bodies[locale]!,
      };
      const html = await new Response(
        await renderToReadableStream(<FoundationBody article={article} />),
      ).text();
      expect(html).toContain("shiki");
      expect(html).toContain("enabled");
      expect(html).toContain(getMessages(locale).codeExample);
    },
  );

  test("the shared path loader extracts real snippets and rejects Windows absolute paths", () => {
    expect(
      loadSnippetPath("state-restoration/kotlin/production.kt", "kotlin"),
    ).toContain("SavedStateHandle");
    expect(() => loadSnippetPath("C:\\outside.kt", "kotlin")).toThrow(
      "must stay inside",
    );
  });
});
