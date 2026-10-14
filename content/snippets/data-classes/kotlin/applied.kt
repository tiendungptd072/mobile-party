package snippets.data_classes.applied

import verification.support.*
import kotlinx.coroutines.flow.*
val state = UserListState(users)
// #region show
val updated = state.copy(
    users = state.users.map { user ->
        if (user.id == id) user.copy(selected = true) else user
    },
)
// #endregion
