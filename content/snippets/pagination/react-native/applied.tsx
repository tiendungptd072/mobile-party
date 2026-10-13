// #region show
type FeedState = {
  items: Post[];
  nextCursor?: string;
  append: "idle" | "loading" | "error";
};

<FlatList
  data={state.items}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <PostRow post={item} />}
  ListFooterComponent={<AppendState value={state.append} />}
/>
// #endregion
