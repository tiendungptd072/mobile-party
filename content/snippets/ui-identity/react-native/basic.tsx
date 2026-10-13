// #region show
<FlatList
  data={posts}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <PostRow post={item} />}
/>
// #endregion
