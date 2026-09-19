export const offlineFirstDataConcept = {
  id: "offline-first-data",
  slug: "offline-first-data",
  title: "Offline-First Data",
  description:
    "Expose local data as the source of truth, then synchronize network changes through a repository without making the screen wait for connectivity.",
  category: "architecture",
  order: 45.75,
  aliases: [
    "Room",
    "offline cache",
    "local source of truth",
    "cache then network",
  ],
  keywords: ["offline", "Room", "cache", "database", "sync", "source of truth"],
  implementations: {
    "react-native": {
      name: "Observe a local cache",
      summary:
        "The screen subscribes to cached domain data; refresh updates that cache.",
      language: "tsx",
      filename: "use-feed.ts",
      code: `function useFeed(repository: FeedRepository) {
  const feed = useSyncExternalStore(
    repository.subscribe,
    repository.getSnapshot,
  );

  useEffect(() => { void repository.refresh(); }, [repository]);
  return feed;
}`,
    },
    kotlin: {
      name: "Observe Room through a repository",
      summary:
        "The ViewModel collects local rows while the repository refreshes them from the network.",
      language: "kotlin",
      filename: "FeedViewModel.kt",
      code: `class FeedViewModel(repository: FeedRepository) : ViewModel() {
    val feed = repository.observeFeed()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    init { viewModelScope.launch { repository.refresh() } }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can render an observable local cache immediately and synchronize in the background. Room is Android's structured SQLite abstraction; AsyncStorage is not a substitute for relational queries or migrations.",
    },
  ],
  mentalModel:
    "Offline-first does not mean 'fall back to stale cache only after a failed fetch.' Higher layers read one local source of truth; the repository alone reconciles network responses and writes with it.",
  differences: [
    "React Native commonly supplies the cache through an application library or custom store; Android commonly represents structured local data with Room entities and DAO Flows.",
    "A Room DAO can validate SQL at compile time and supports schema migrations; its entity types remain data-layer details, not UI models.",
  ],
  commonMistakes: [
    "Letting a ViewModel or composable race a direct network response against Room, creating two sources of truth.",
    "Treating every write as safely queueable; choose explicitly between online-only, queued, and lazy writes based on the operation's correctness requirements.",
  ],
  productionNotes: [
    "Read from the local store, map network and entity models at the boundary, and update the store transactionally before observers render refreshed data.",
    "Surface freshness and retry intent to users where it matters; use durable queued work only when the business operation is safe to replay.",
  ],
} as const;
