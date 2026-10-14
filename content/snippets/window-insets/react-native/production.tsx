declare const Profile: import("react").ComponentType;

// #region show
function FeedScreen() {
  const insets = useSafeAreaInsets();
  return <FlatList contentContainerStyle={{ paddingBottom: insets.bottom }} data={posts} renderItem={({ item }) => <PostRow post={item} />} />;
}
// #endregion
