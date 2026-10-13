// #region show
function useFeed(repository: FeedRepository) {
  const feed = useSyncExternalStore(
    repository.subscribe,
    repository.getSnapshot,
  );

  useEffect(() => { void repository.refresh(); }, [repository]);
  return feed;
}
// #endregion
