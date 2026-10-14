type Props = {
  posts: Post[];
  renderPost(post: Post, index: number): import("react").ReactElement;
};

// #region show
function FeedList({ posts, renderPost }: Props) {
  return <FlatList
    data={posts}
    keyExtractor={(post) => post.id}
    renderItem={({ item, index }) => renderPost(item, index)}
  />;
}
// #endregion
