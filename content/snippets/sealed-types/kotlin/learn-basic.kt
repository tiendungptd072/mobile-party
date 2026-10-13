package snippets.sealed_types.learn_basic

// #region show
sealed interface State {
    data object Loading : State
    data class Ready(val user: User) : State
}

when (state) {
    State.Loading -> Spinner()
    is State.Ready -> Profile(state.user)
}
// #endregion
