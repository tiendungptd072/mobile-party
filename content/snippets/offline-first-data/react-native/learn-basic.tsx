declare const api: { getFeed(): Promise<Post[]> };
declare const cache: {
  save(posts: Post[]): void;
  onChange(listener: () => void): () => void;
};
// #region show
class FeedRepository {
  private items: Post[] = [];
  getSnapshot = () => this.items;
  subscribe = (listener: () => void) => cache.onChange(listener);
  async refresh() { this.items = await api.getFeed(); cache.save(this.items); }
}
// #endregion
