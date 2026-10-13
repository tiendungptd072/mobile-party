package snippets.list.learn_basic

// #region show
LazyColumn {
    items(users) { user -> UserRow(user) }
}
// #endregion
