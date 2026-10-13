package snippets.ui_identity.applied

// #region show
val sorted = posts.sortedByDescending(Post::createdAt)
LazyColumn {
    items(sorted, key = { it.id }) { post -> EditablePost(post) }
}
// #endregion
