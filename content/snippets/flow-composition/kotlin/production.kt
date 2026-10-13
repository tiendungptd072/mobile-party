package snippets.flow_composition.production

// #region show
@Test fun combinesPostsAndFavorites() = runTest {
    val posts = MutableStateFlow(listOf(post))
    val ids = MutableStateFlow(emptySet<String>())
    val visible = combine(posts, ids) { rows, saved -> rows.filter { it.id in saved } }
    assertEquals(emptyList<Post>(), visible.first())
    ids.value = setOf(post.id)
    assertEquals(listOf(post), visible.first())
}
// #endregion
