package snippets.list.basic

// #region show
LazyColumn {
    items(
        items = users,
        key = { user -> user.id },
    ) { user ->
        UserRow(user = user)
    }
}
// #endregion
