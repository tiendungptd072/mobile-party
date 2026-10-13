package snippets.children.production

// #region show
@Composable
fun FeedList(
    posts: List<Post>,
    renderPost: @Composable LazyItemScope.(Post, Int) -> Unit,
) {
    LazyColumn {
        itemsIndexed(posts, key = { _, post -> post.id }) { index, post ->
            renderPost(post, index)
        }
    }
}
// #endregion
