package snippets.state_owner_testing.basic

// #region show
@get:Rule val mainDispatcherRule = MainDispatcherRule()

@Test fun showsSavedPost() = runTest {
    val repository = FakeFeedRepository()
    val viewModel = FeedViewModel(repository)
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
        viewModel.uiState.collect {}
    }
    repository.emit(listOf(post))
    assertEquals(listOf(post), viewModel.uiState.value.items)
}
// #endregion
