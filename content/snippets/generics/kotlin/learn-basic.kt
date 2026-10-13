package snippets.generics.learn_basic

// #region show
data class Page<T>(
    val items: List<T>,
    val nextCursor: String?,
)
// #endregion
