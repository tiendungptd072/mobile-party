package snippets.flow_and_stateflow.learn_basic

// #region show
fun pages(): Flow<Page> = flow {
    emit(api.loadPage(1))
    emit(api.loadPage(2))
}

suspend fun loadPages() {
    pages().collect { page -> append(page) }
}
// #endregion
