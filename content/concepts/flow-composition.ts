export const flowCompositionConcept = {
  id: "flow-composition",
  slug: "flow-composition",
  title: "Combining and Testing Flows",
  description:
    "Combine local posts and favorites into visible data, classify upstream failure, and verify emissions with controlled sources.",
  category: "async",
  order: 40.75,
  aliases: ["combine flows", "Flow catch", "Flow test", "MutableStateFlow"],
  keywords: ["combine", "Flow", "catch", "retryWhen", "test", "emission"],
  implementations: {
    "react-native": {
      name: "Derive a view from two store snapshots",
      summary:
        "React reads current posts and favorites, then derives the visible list during render.",
      language: "tsx",
      filename: "SavedFeed.tsx",
      code: `function SavedFeed() {
  const posts = useSyncExternalStore(postStore.subscribe, postStore.getSnapshot);
  const favoriteIds = useSyncExternalStore(favoriteStore.subscribe, favoriteStore.getSnapshot);
  const visible = posts.filter((post) => favoriteIds.has(post.id));
  return <FeedList posts={visible} />;
}`,
    },
    kotlin: {
      name: "Combine two repository Flows",
      summary:
        "A new list is produced when either upstream source emits after both have initial values.",
      language: "kotlin",
      filename: "SavedFeedRepository.kt",
      code: `val savedPosts: Flow<List<Post>> = combine(
    postDao.observePosts(), favoriteDao.observeIds(),
) { posts, ids -> posts.filter { it.id in ids } }`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both derive visible posts from posts and favorite IDs. React derives from the current snapshots during render; Flow combine emits only after each source has emitted and then reacts to either source.",
    },
  ],
  mentalModel:
    "Keep derivation pure. Put data-source combination in the repository when it is application data, and expose one stream to the ViewModel. Decide whether a failed upstream should retry, surface an error state, or end the stream.",
  differences: [
    "Flow combine waits for an emission from every input; a React render already reads the current snapshot of each subscribed store.",
    "Flow catch handles upstream exceptions and then completes unless the upstream is retried; it does not silently resume an ongoing database observation.",
  ],
  commonMistakes: [
    "Launching separate collectors that overwrite the same screen list and race each other.",
    "Asserting every intermediate StateFlow value even though StateFlow conflates rapid updates, or swallowing coroutine cancellation as a normal data error.",
  ],
  productionNotes: [
    "Use controlled fake Flows to test initial values, updates from each source, and error policy; assert StateFlow.value for current screen state.",
    "For stateIn with WhileSubscribed, keep a test collector active while verifying updates and cancel it when the test ends.",
  ],
} as const;
