package snippets.async.learn_basic

import verification.support.*
// #region show
suspend fun loadUser(id: String): User {
    return repository.getUser(id)
}
// #endregion
