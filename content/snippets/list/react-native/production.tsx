// #region show
return items.length === 0
  ? <EmptyView onRetry={reload} />
  : <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} />;
// #endregion
