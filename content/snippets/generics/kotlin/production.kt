package snippets.generics.production

import verification.support.*
// #region show
sealed interface AppResult<out T> {
    data class Success<T>(val value: T) : AppResult<T>
    data class Failure(val error: AppError) : AppResult<Nothing>
}

suspend fun loadUser(): AppResult<User> = repository.loadUser()
// #endregion
