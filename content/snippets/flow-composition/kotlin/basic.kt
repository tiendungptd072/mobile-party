package snippets.flow_composition.basic

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
val savedPosts: Flow<List<Post>> = combine(
    postDao.observePosts(), favoriteDao.observeIds(),
) { posts, ids -> posts.filter { it.id in ids } }
// #endregion
