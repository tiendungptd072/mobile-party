type FeedState = { kind: "loading" } | { kind: "ready"; items: Post[] };
type FeedSource = {
  subscribe(listener: (state: FeedState) => void): () => void;
};
declare const feedStore: {
  subscribe(listener: () => void): () => void;
  getSnapshot(): FeedState;
};
declare const FeedScreen: import("react").ComponentType<{ state: FeedState }>;
declare const api: { loadPage(page: number): Promise<Post[]> };
declare function append(page: Post[]): void;

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
