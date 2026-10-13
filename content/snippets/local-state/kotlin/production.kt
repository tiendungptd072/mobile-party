package snippets.local_state.production

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
