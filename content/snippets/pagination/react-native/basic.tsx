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
declare const state: {
  items: Post[];
  canLoadMore: boolean;
  isAppending: boolean;
};
// #region show
<FlatList
  data={state.items}
  renderItem={({ item }) => <PostRow post={item} />}
  keyExtractor={(item) => item.id}
  onEndReached={() => state.canLoadMore && loadMore()}
  ListFooterComponent={state.isAppending ? <ActivityIndicator /> : null}
/>
// #endregion
