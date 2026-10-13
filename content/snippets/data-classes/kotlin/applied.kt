package snippets.data_classes.applied

// #region show
val updated = state.copy(
    users = state.users.map { user ->
        if (user.id == id) user.copy(selected = true) else user
    },
)
// #endregion
