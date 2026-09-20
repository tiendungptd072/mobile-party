export const refreshBookmarkRacesConcept = {
  id: "refresh-bookmark-races",
  slug: "refresh-bookmark-races",
  title: "Refresh and Bookmark Races",
  description:
    "Keep a feed refresh from erasing a bookmark changed while the request is in flight.",
  category: "architecture",
  order: 45.6875,
  aliases: ["refresh race", "bookmark conflict", "concurrent state updates"],
  keywords: [
    "race condition",
    "bookmark",
    "refresh",
    "useReducer",
    "StateFlow",
  ],
  implementations: {
    "react-native": {
      name: "Update independent state fields",
      summary:
        "A React state updater reads the latest feed state when the network result arrives.",
      language: "tsx",
      filename: "use-feed.ts",
      code: `const [feed, setFeed] = useState<FeedState>(initialFeed);

async function refresh() {
  const posts = await api.loadPosts();
  setFeed((current) => ({ ...current, posts }));
}`,
    },
    kotlin: {
      name: "Update the current StateFlow value",
      summary:
        "A ViewModel updates only remote post fields and preserves the local bookmark overlay.",
      language: "kotlin",
      filename: "FeedViewModel.kt",
      code: `private val feed = MutableStateFlow(FeedState())

suspend fun refresh() {
    val posts = api.loadPosts()
    feed.update { current -> current.copy(posts = posts) }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "React functional state updates and MutableStateFlow.update both derive a new value from current state. React schedules rendering from its update queue; StateFlow updates its value atomically. Neither resolves a server-versus-local bookmark conflict by itself.",
    },
  ],
  mentalModel:
    "Treat fetched post fields and a pending local bookmark choice as different owners of data. Refresh may replace fetched fields, but it must not replace the bookmark overlay. Define a separate server reconciliation policy before clearing pending local changes.",
  differences: [
    "React's functional updater prevents a stale closure from replacing a newer bookmark state. Kotlin's MutableStateFlow.update is safe for concurrent updates to that StateFlow value.",
    "An in-memory overlay protects one running screen or ViewModel only. Persist bookmark intent in the data layer when it must survive process death or offline sync.",
  ],
  commonMistakes: [
    "Capturing feed before await, then replacing the entire state with that stale snapshot after refresh finishes.",
    "Assuming cancellation or last-request-wins also resolves a bookmark changed locally while a valid refresh is in flight.",
  ],
  productionNotes: [
    "Test both event orders: bookmark before refresh completion and bookmark after refresh completion. Assert the rendered post title and bookmark flag together.",
    "For persistent offline data, store bookmark intent separately or merge it in one local transaction. Define acknowledgement, conflict, and retry behavior with the server; do not keep the overlay forever without a policy.",
  ],
} as const;
