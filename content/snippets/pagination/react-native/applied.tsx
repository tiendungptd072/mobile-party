declare const repository: {
  getPage(
    cursor: string,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};
declare const api: {
  getFeed(
    cursor: string | null,
    signal: AbortSignal,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
};
declare const state: FeedState;
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
