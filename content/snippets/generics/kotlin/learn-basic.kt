package snippets.generics.learn_basic

import verification.support.*
// #region show
data class Page<T>(
    val items: List<T>,
    val nextCursor: String?,
)
// #endregion
