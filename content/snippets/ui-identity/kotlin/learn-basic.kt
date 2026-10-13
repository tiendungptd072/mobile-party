package snippets.ui_identity.learn_basic

// #region show
LazyColumn {
    items(posts, key = { it.id }) { post -> PostRow(post) }
}
// #endregion
