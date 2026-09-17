import { describe, expect, test } from "bun:test";
import { createPageMetadata } from "@/lib/site";

describe("site metadata", () => {
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
