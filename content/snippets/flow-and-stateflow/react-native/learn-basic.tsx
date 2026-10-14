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
async function* pages() {
  yield await api.loadPage(1);
  yield await api.loadPage(2);
}

async function loadPages() {
  for await (const page of pages()) append(page);
}
// #endregion
