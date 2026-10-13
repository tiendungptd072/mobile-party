// #region show
type FeedState = {
  items: Post[];
  isRefreshing: boolean;
};

<FlatList data={state.items} refreshing={state.isRefreshing} onRefresh={refresh} />
// #endregion
