// #region show
<FlatList
  data={state.items}
  keyExtractor={(item) => item.id}
  onEndReached={() => state.canLoadMore && loadMore()}
  ListFooterComponent={state.isAppending ? <ActivityIndicator /> : null}
/>
// #endregion
