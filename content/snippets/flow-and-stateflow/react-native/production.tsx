// #region show
function createFeedStore(source: FeedSource) {
  let snapshot: FeedState = { kind: "loading" };
  let stop: (() => void) | undefined;
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!stop) stop = source.subscribe((next) => {
        snapshot = next;
        listeners.forEach((notify) => notify());
      });
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) { stop?.(); stop = undefined; }
      };
    },
  };
}
// #endregion
