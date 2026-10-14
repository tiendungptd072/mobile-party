package snippets.state_owner_testing.learn_basic

import verification.support.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.test.*
import org.junit.Test
import org.junit.Assert.*
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
