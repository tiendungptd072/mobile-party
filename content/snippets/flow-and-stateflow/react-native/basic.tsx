// #region show
function FeedRoute() {
  const state = useSyncExternalStore(feedStore.subscribe, feedStore.getSnapshot);
  return <FeedScreen state={state} />;
}
// #endregion
