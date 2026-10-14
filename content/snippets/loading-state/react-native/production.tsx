declare const state: FeedState;
// #region show
type FeedState = {
  items: Post[];
  isRefreshing: boolean;
};

<FlatList data={state.items} renderItem={({ item }) => <PostRow post={item} />} refreshing={state.isRefreshing} onRefresh={refresh} />
// #endregion
