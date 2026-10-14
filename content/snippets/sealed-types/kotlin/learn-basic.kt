package snippets.sealed_types.learn_basic

import verification.support.*
import androidx.compose.runtime.*
// #region show
sealed interface State {
    data object Loading : State
    data class Ready(val user: User) : State
}

@Composable
fun ProfileContent(state: State) {
    when (state) {
        State.Loading -> Spinner()
        is State.Ready -> Profile(state.user)
    }
}
// #endregion
