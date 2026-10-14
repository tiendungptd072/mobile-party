package snippets.state_owner_testing.applied

import verification.support.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.test.*
import org.junit.Assert.*
val repository = FakeFeedRepository(); val viewModel = FeedViewModel(repository)
fun TestScope.verificationSnippet() {
// #region show
backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) {
    viewModel.uiState.collect {}
}
repository.emit(listOf(post))
assertEquals(listOf(post), viewModel.uiState.value.items)
// #endregion

}
