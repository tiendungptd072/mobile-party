package snippets.pagination.learn_basic

// #region show
private var appendJob: Job? = null

fun loadMore() {
    if (appendJob?.isActive == true) return
    val cursor = state.value.nextCursor ?: return
    appendJob = viewModelScope.launch {
        _state.update { it.copy(append = Loading) }
        try {
            val page = repository.getPage(cursor)
            _state.update { it.append(page) }
        } catch (cancelled: CancellationException) {
            throw cancelled
        } catch (error: Throwable) {
            _state.update { it.copy(append = Error(error)) }
        }
    }
}
// #endregion
