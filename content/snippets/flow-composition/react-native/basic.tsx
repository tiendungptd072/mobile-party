declare const postStore: {
  subscribe(listener: () => void): () => void;
  getSnapshot(): Post[];
};
declare const favoriteStore: {
  subscribe(listener: () => void): () => void;
  getSnapshot(): ReadonlySet<string>;
};
declare const FeedList: import("react").ComponentType<{ posts: Post[] }>;
declare const repository: { refresh(): Promise<void> };
declare let state: { refreshError: AppError | null };

// #region show
function SavedFeed() {
  const posts = useSyncExternalStore(postStore.subscribe, postStore.getSnapshot);
  const favoriteIds = useSyncExternalStore(favoriteStore.subscribe, favoriteStore.getSnapshot);
  const visible = posts.filter((post) => favoriteIds.has(post.id));
  return <FeedList posts={visible} />;
}
// #endregion
