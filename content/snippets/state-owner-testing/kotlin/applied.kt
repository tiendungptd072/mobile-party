package snippets.state_owner_testing.applied

// #region show
backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
    viewModel.uiState.collect {}
}
repository.emit(listOf(post))
assertEquals(listOf(post), viewModel.uiState.value.items)
// #endregion
