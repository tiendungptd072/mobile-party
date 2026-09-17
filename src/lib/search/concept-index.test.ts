import { describe, expect, test } from "bun:test";
import { getConcepts } from "@/lib/content/concepts";
import {
  createConceptSearchIndex,
  searchConceptIndex,
} from "@/lib/search/concept-index";

const index = createConceptSearchIndex(getConcepts());

describe("concept search index", () => {
  test("indexes aliases, keywords, and framework API names", () => {
    expect(searchConceptIndex(index, "FlatList")[0]?.slug).toBe("list");
    expect(searchConceptIndex(index, "mutableStateOf")[0]?.slug).toBe(
      "local-state",
    );
    expect(searchConceptIndex(index, "recomposition")[0]?.slug).toBe(
      "local-state",
    );
  });

  test("returns the complete static index for an empty query", () => {
    expect(searchConceptIndex(index, "")).toHaveLength(getConcepts().length);
  });

  test("returns no result for unrelated text", () => {
    expect(searchConceptIndex(index, "unrelated-term")).toEqual([]);
  });
});
