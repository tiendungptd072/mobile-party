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
try {
  await repository.refresh();
  state = { ...state, refreshError: null };
} catch (error) {
  state = { ...state, refreshError: toFeedError(error) };
}
// #endregion
