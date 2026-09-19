export const offlinePaginationConcept = {
  id: "offline-pagination",
  slug: "offline-pagination",
  title: "Offline Pagination",
  description:
    "Page UI from a local database and let a coordinator fetch and persist remote pages when cached data is exhausted.",
  category: "architecture",
  order: 45.875,
  aliases: ["RemoteMediator", "PagingSource", "remote keys", "Room Paging"],
  keywords: ["Paging", "RemoteMediator", "Room", "offline", "cursor", "append"],
  implementations: {
    "react-native": {
      name: "Persist cursor pages",
      summary:
        "A repository keeps list rows and the next cursor together in its local cache.",
      language: "tsx",
      filename: "feed-repository.ts",
      code: `async function append() {
  if (cache.nextCursor === null) return;
  const page = await api.getFeed({ cursor: cache.nextCursor });
  cache.transaction(() => cache.upsert(page.items, page.nextCursor));
}`,
    },
    kotlin: {
      name: "Page Room with RemoteMediator",
      summary:
        "PagingSource reads Room; RemoteMediator fetches remote pages and writes them back.",
      language: "kotlin",
      filename: "FeedRepository.kt",
      code: `val posts: Flow<PagingData<PostEntity>> = Pager(
    config = PagingConfig(pageSize = 30),
    remoteMediator = FeedRemoteMediator(api, database),
) { database.postDao().pagingSource() }.flow`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both coordinate a cursor, local rows, append errors, and refresh. Paging's RemoteMediator formalizes the Android pattern: UI pages only from Room while network data enters through a transactional cache update.",
    },
  ],
  mentalModel:
    "RemoteMediator is not a network list component. It is the coordinator between Paging demand and a database-backed source of truth; the UI never renders its response directly.",
  differences: [
    "FlatList exposes an end-reached signal and React Native apps choose their own cache protocol; Paging supplies load types and load-state APIs.",
    "For cursor APIs whose key is not an item ID, store remote keys with the cached rows so a restart can request the correct next page.",
  ],
  commonMistakes: [
    "Rendering a RemoteMediator network response directly, or keeping a competing in-memory list beside the Room PagingSource.",
    "Clearing cached rows and remote keys outside one transaction, or retrying an append with a stale cursor.",
  ],
  productionNotes: [
    "Model refresh, append, prepend, and their errors independently. Preserve readable cached rows when a remote append fails.",
    "Choose cache freshness deliberately in initialize(); a required refresh must finish before append/prepend can rely on its keys.",
  ],
} as const;
