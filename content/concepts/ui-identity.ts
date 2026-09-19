export const uiIdentityConcept = {
  id: "ui-identity",
  slug: "ui-identity",
  title: "UI Identity and Keys",
  description:
    "Use stable identity to preserve row state and effects when collections are inserted, removed, or reordered.",
  category: "lifecycle",
  order: 8.1,
  aliases: ["React key", "Compose key", "stable item key"],
  keywords: ["identity", "key", "reorder", "state preservation", "list"],
  implementations: {
    "react-native": {
      name: "FlatList keyExtractor",
      summary: "A domain ID identifies each row across ordering changes.",
      language: "tsx",
      filename: "Feed.tsx",
      code: `<FlatList
  data={posts}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <PostRow post={item} />}
/>`,
    },
    kotlin: {
      name: "LazyColumn item key",
      summary:
        "A stable key associates each item with its composition identity.",
      language: "kotlin",
      filename: "Feed.kt",
      code: `LazyColumn {
    items(posts, key = { it.id }) { post ->
        PostRow(post)
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both use stable keys to distinguish reordered list items, but React reconciliation and Compose call-site identity are different mechanisms.",
    },
  ],
  mentalModel:
    "Use a stable domain identifier for each repeated item. In Compose, a call site plus execution position identifies a composable by default; key adds identity when position can move.",
  differences: [
    "React keys participate in sibling reconciliation; Compose key helps identify executions of a composable call site.",
    "A key preserves local state only while its keyed content remains in the relevant composition or saveable-state scope.",
  ],
  commonMistakes: [
    "Using an array index as the key for reorderable items, then seeing row state follow the wrong item.",
  ],
  productionNotes: [
    "Keep IDs stable across refresh and pagination, and test insert, remove, and reorder operations with row-local state.",
  ],
} as const;
