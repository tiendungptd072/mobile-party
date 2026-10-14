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
function FeedRoute() {
  const state = useSyncExternalStore(feedStore.subscribe, feedStore.getSnapshot);
  return <FeedScreen state={state} />;
}
// #endregion
