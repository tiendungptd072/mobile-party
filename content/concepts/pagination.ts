export const paginationConcept = {
  id: "pagination",
  slug: "pagination",
  title: "Pagination",
  category: "lists",
  order: 32,
  description:
    "Load large collections incrementally while preserving stable item identity and explicit append states.",
  aliases: ["infinite scroll", "onEndReached", "Paging", "load more"],
  keywords: ["pagination", "cursor", "append", "refresh", "list"],
  implementations: {
    "react-native": {
      name: "FlatList onEndReached",
      summary:
        "A list requests another page near its end while append state prevents duplicate work.",
      language: "typescript",
      filename: "feed.tsx",
      code: `<FlatList
  data={state.items}
  keyExtractor={(item) => item.id}
  onEndReached={() => state.canLoadMore && loadMore()}
  ListFooterComponent={state.isAppending ? <ActivityIndicator /> : null}
/>`,
    },
    kotlin: {
      name: "LazyColumn append state",
      summary:
        "A lazy list observes append availability and renders a footer from explicit state.",
      language: "kotlin",
      filename: "Feed.kt",
      code: `LazyColumn {
  items(state.items, key = { it.id }) { item -> FeedRow(item) }
  if (state.isAppending) item { CircularProgressIndicator() }
}

LaunchedEffect(state.nearEnd, state.canLoadMore) {
  if (state.nearEnd && state.canLoadMore) viewModel.loadMore()
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both observe proximity to the end of a lazy list and request an additional page through a state owner.",
    },
  ],
  mentalModel:
    "Pagination has separate initial, refresh, append, exhausted, and append-error states. It is not simply a callback at the last row.",
  differences: [
    "FlatList provides onEndReached directly.",
    "Compose lets the app observe LazyListState or use a paging library when that added abstraction is justified.",
  ],
  commonMistakes: [
    "Issuing concurrent page requests, losing cursor ordering, or replacing existing items while an append is in progress.",
  ],
  productionNotes: [
    "Use server cursors where possible, deduplicate by stable ID, preserve visible content on append failure, and make retry target the failed page.",
  ],
} as const;
