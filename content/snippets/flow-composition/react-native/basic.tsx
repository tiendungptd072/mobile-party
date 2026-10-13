// #region show
function SavedFeed() {
  const posts = useSyncExternalStore(postStore.subscribe, postStore.getSnapshot);
  const favoriteIds = useSyncExternalStore(favoriteStore.subscribe, favoriteStore.getSnapshot);
  const visible = posts.filter((post) => favoriteIds.has(post.id));
  return <FeedList posts={visible} />;
}
// #endregion
