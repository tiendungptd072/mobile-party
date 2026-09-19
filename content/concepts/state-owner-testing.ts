export const stateOwnerTestingConcept = {
  id: "state-owner-testing",
  slug: "state-owner-testing",
  title: "State Owner and Data Tests",
  description:
    "Test the state transition contract with a fake repository and controlled coroutine time before adding database integration tests.",
  category: "testing",
  order: 45.975,
  aliases: [
    "ViewModel test",
    "runTest",
    "fake repository",
    "MainDispatcherRule",
  ],
  keywords: [
    "ViewModel",
    "test",
    "fake",
    "dispatcher",
    "repository",
    "StateFlow",
  ],
  implementations: {
    "react-native": {
      name: "Test a state owner with a fake",
      summary:
        "Inject a fake data source and assert the next observable state after a user action.",
      language: "tsx",
      filename: "use-feed.test.tsx",
      code: `const repository = new FakeFeedRepository();
const { result } = await renderHook(() => useFeed(repository));
await act(async () => repository.emit([post]));
expect(result.current.items).toEqual([post]);`,
    },
    kotlin: {
      name: "Test ViewModel state with runTest",
      summary:
        "A fake repository emits controlled data while a test dispatcher drives ViewModel work.",
      language: "kotlin",
      filename: "FeedViewModelTest.kt",
      code: `@get:Rule val mainDispatcherRule = MainDispatcherRule()

@Test fun showsSavedPost() = runTest {
    val repository = FakeFeedRepository()
    val viewModel = FeedViewModel(repository)
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
        viewModel.uiState.collect {}
    }
    repository.emit(listOf(post))
    assertEquals(listOf(post), viewModel.uiState.value.items)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both replace the repository to test screen state independently of network and disk. Kotlin ViewModel tests also need controlled dispatchers and an active collector when stateIn starts only while subscribed.",
    },
  ],
  mentalModel:
    "Test at the boundary that owns state. A fake repository proves the screen transition contract; a separate repository integration test proves Room queries, mappings, and transactions with real storage.",
  differences: [
    "React Native hook tests control React updates with act; coroutine tests use runTest and test dispatchers to control scheduled work and virtual time.",
    "A StateFlow exposes a conflated current value; assert value when testing the final state, and collect individual emissions only when ordering is the behavior under test.",
  ],
  commonMistakes: [
    "Mocking every internal method so the test only mirrors the implementation rather than the state contract.",
    "Testing a WhileSubscribed stateIn without a collector, or using real delays and dispatchers that make tests flaky.",
  ],
  productionNotes: [
    "Use one test scheduler, replace Dispatchers.Main in local ViewModel tests, and make fake data sources emit controlled success and failure cases.",
    "Add Room integration tests for query ordering, migration, and transaction behavior; a fake repository cannot prove SQL correctness.",
  ],
} as const;
