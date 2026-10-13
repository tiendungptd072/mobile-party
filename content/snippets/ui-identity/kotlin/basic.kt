package snippets.ui_identity.basic

// #region show
LazyColumn {
    items(posts, key = { it.id }) { post ->
        PostRow(post)
    }
}
// #endregion
