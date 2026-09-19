export const flowTestingStageExamples = {
  "flow-composition": {
    basic: {
      "react-native": {
        name: "Derive saved posts from snapshots",
        summary: "Filtering is a pure calculation over current store values.",
        language: "tsx",
        filename: "SavedFeed.tsx",
        code: `const posts = useSyncExternalStore(postStore.subscribe, postStore.getSnapshot);
const ids = useSyncExternalStore(favoriteStore.subscribe, favoriteStore.getSnapshot);
const visible = posts.filter((post) => ids.has(post.id));`,
      },
      kotlin: {
        name: "Combine local streams",
        summary:
          "Either DAO update recalculates the visible list after both have emitted.",
        language: "kotlin",
        filename: "SavedFeedRepository.kt",
        code: `val visiblePosts = combine(postsDao.observeAll(), favoritesDao.observeIds()) {
    posts, favoriteIds -> posts.filter { it.id in favoriteIds }
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Classify a refresh failure",
        summary:
          "A failed refresh becomes an explicit state while the cached list remains readable.",
        language: "typescript",
        filename: "feed-repository.ts",
        code: `try {
  await repository.refresh();
  state = { ...state, refreshError: null };
} catch (error) {
  state = { ...state, refreshError: toFeedError(error) };
}`,
      },
      kotlin: {
        name: "Choose an upstream error policy",
        summary:
          "Transient I/O gets bounded retries; the final error is represented in state.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        code: `val uiState = repository.visiblePosts
    .map<List<Post>, FeedUiState> { FeedUiState.Ready(it) }
    .retryWhen { error, attempt -> error is IOException && attempt < 2 }
    .catch { error ->
        if (error is IOException) emit(FeedUiState.Error)
        else throw error
    }`,
      },
    },
    production: {
      "react-native": {
        name: "Test both source updates",
        summary:
          "A pure selector test covers posts and favorite IDs without a UI renderer.",
        language: "typescript",
        filename: "saved-feed.test.ts",
        code: `expect(selectSavedPosts([post], new Set<string>())).toEqual([]);
expect(selectSavedPosts([post], new Set([post.id]))).toEqual([post]);`,
      },
      kotlin: {
        name: "Test combined emissions",
        summary:
          "Controlled StateFlows show that either source can change the result.",
        language: "kotlin",
        filename: "SavedFeedRepositoryTest.kt",
        code: `@Test fun combinesPostsAndFavorites() = runTest {
    val posts = MutableStateFlow(listOf(post))
    val ids = MutableStateFlow(emptySet<String>())
    val visible = combine(posts, ids) { rows, saved -> rows.filter { it.id in saved } }
    assertEquals(emptyList<Post>(), visible.first())
    ids.value = setOf(post.id)
    assertEquals(listOf(post), visible.first())
}`,
      },
    },
  },
  "state-owner-testing": {
    basic: {
      "react-native": {
        name: "Assert a visible state transition",
        summary:
          "Test the result of loading a post, not a private setter call.",
        language: "tsx",
        filename: "use-feed.test.tsx",
        code: `const repository = new FakeFeedRepository([post]);
const { result } = await renderHook(() => useFeed(repository));
await waitFor(() => expect(result.current.items).toEqual([post]));`,
      },
      kotlin: {
        name: "Assert a ViewModel state transition",
        summary: "A fake supplies one known result.",
        language: "kotlin",
        filename: "FeedViewModelTest.kt",
        code: `@Test fun loadsPost() = runTest {
    val viewModel = FeedViewModel(FakeFeedRepository(listOf(post)))
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
        viewModel.uiState.collect {}
    }
    advanceUntilIdle()
    assertEquals(listOf(post), viewModel.uiState.value.items)
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Control a later emission",
        summary: "The fake emits a new list after the initial render.",
        language: "tsx",
        filename: "use-feed.test.tsx",
        code: `const repository = new FakeFeedRepository([]);
const { result } = await renderHook(() => useFeed(repository));
await act(async () => repository.emit([post]));
expect(result.current.items).toEqual([post]);`,
      },
      kotlin: {
        name: "Keep a subscriber active",
        summary:
          "WhileSubscribed state starts collecting only with a subscriber.",
        language: "kotlin",
        filename: "FeedViewModelTest.kt",
        code: `backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
    viewModel.uiState.collect {}
}
repository.emit(listOf(post))
assertEquals(listOf(post), viewModel.uiState.value.items)`,
      },
    },
    production: {
      "react-native": {
        name: "Keep storage tests separate",
        summary:
          "A fake proves state transitions; a storage test proves persistence.",
        language: "typescript",
        filename: "feed-cache.test.ts",
        code: `await cache.upsert([post]);
const reopened = await openTestCache();
expect(await reopened.getById(post.id)).toEqual(post);`,
      },
      kotlin: {
        name: "Test Room with a real DAO",
        summary:
          "The integration test verifies a query that a fake cannot check.",
        language: "kotlin",
        filename: "PostDaoTest.kt",
        code: `val database = Room.inMemoryDatabaseBuilder<AppDatabase>(context)
    .setDriver(BundledSQLiteDriver()).build()
try {
    database.postDao().upsert(postEntity)
    assertEquals(listOf(postEntity), database.postDao().observeAll().first())
} finally {
    database.close()
}`,
      },
    },
  },
} as const;
