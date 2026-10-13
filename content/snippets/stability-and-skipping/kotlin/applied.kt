package snippets.stability_and_skipping.applied

// #region show
LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(name = user.name)
    }
}
// #endregion
