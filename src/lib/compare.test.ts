import { describe, expect, test } from "bun:test";
import { getConceptRelationship, getCompareUrl } from "@/lib/compare";
import { getConceptBySlug } from "@/lib/content/concepts";

describe("comparison helpers", () => {
  test("finds a relationship regardless of the selected direction", () => {
    const concept = getConceptBySlug("local-state");

    expect(concept).toBeDefined();
    expect(
      getConceptRelationship(concept!, "kotlin", "react-native"),
    ).toMatchObject({
      type: "similar",
    });
  });

  test("creates a comparison URL with the active technology pair", () => {
    expect(
      getCompareUrl("local-state", {
        source: "react-native",
        target: "kotlin",
      }),
    ).toBe("/compare/local-state?source=react-native&target=kotlin");
  });
});
