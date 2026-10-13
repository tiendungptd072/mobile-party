// #region show
function FeedScreen() {
  const insets = useSafeAreaInsets();
  return <FlatList contentContainerStyle={{ paddingBottom: insets.bottom }} data={posts} />;
}
// #endregion
