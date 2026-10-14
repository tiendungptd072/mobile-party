declare const api: { getFeed(): Promise<{ items: Post[] }> };
declare const cache: { save(posts: Post[]): void };
class VerificationRepository {
  items: Post[] = [];

// #region show
async refresh() {
  const response = await api.getFeed();
  this.items = response.items.map(toPost);
  cache.save(this.items);
}
// #endregion
}
