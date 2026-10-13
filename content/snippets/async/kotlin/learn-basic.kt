package snippets.async.learn_basic

// #region show
suspend fun loadUser(id: String): User {
    return repository.getUser(id)
}
// #endregion
