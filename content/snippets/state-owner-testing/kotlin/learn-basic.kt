package snippets.state_owner_testing.learn_basic

// #region show
@Test fun loadsPost() = runTest {
    val viewModel = FeedViewModel(FakeFeedRepository(listOf(post)))
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
        viewModel.uiState.collect {}
    }
    advanceUntilIdle()
    assertEquals(listOf(post), viewModel.uiState.value.items)
}
// #endregion
