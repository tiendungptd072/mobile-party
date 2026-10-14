package snippets.flow_composition.learn_basic

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
val visiblePosts = combine(postsDao.observeAll(), favoritesDao.observeIds()) {
    posts, favoriteIds -> posts.filter { it.id in favoriteIds }
}
// #endregion
