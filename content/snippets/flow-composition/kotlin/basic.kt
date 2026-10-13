package snippets.flow_composition.basic

// #region show
val savedPosts: Flow<List<Post>> = combine(
    postDao.observePosts(), favoriteDao.observeIds(),
) { posts, ids -> posts.filter { it.id in ids } }
// #endregion
