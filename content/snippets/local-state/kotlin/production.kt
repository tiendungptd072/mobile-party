package snippets.local_state.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.flow.*
// #region show
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count = _count.asStateFlow()

    fun increment() = _count.update { it + 1 }
}

@Composable
fun CounterRoute(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsStateWithLifecycle()
    Counter(count, onIncrement = viewModel::increment)
}
// #endregion
