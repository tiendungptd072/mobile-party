import { describe, expect, test } from "bun:test";
import { createLocalizedPageMetadata, createPageMetadata } from "@/lib/site";

describe("site metadata", () => {
  test("creates localized canonical and language alternate URLs", () => {
    const metadata = createLocalizedPageMetadata({
      locale: "vi",
      path: "/dictionary/local-state",
      title: "State cục bộ",
      description: "Mô tả",
    });

    expect(metadata.alternates).toEqual({
      canonical: "/vi/dictionary/local-state",
      languages: {
        en: "/en/dictionary/local-state",
        vi: "/vi/dictionary/local-state",
      },
    });
  });

  test("creates canonical metadata from a public path", () => {
    const metadata = createPageMetadata({
      title: "Dictionary",
      description: "Search concepts.",
      path: "/dictionary",
    });

    expect(metadata.alternates?.canonical).toBe("/dictionary");
    expect(metadata.openGraph?.url).toBe("/dictionary");
  });
});
