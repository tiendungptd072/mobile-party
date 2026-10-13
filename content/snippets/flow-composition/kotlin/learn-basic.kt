package snippets.flow_composition.learn_basic

// #region show
val visiblePosts = combine(postsDao.observeAll(), favoritesDao.observeIds()) {
    posts, favoriteIds -> posts.filter { it.id in favoriteIds }
}
// #endregion
