package snippets.state_owner_testing.basic

import verification.support.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.test.*
import org.junit.Test
import org.junit.Rule
import org.junit.Assert.*
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
