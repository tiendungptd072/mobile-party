type Page = { items: Post[]; nextCursor: string | null };
declare const api: { getFeed(params: { cursor: string }): Promise<Page> };
declare const page: Page;
declare const cache: {
  nextCursor: string | null;
  transaction(action: () => void): void;
  upsert(items: Post[], cursor?: string | null): void;
};

// #region show
async function append() {
  if (cache.nextCursor === null) return;
  const page = await api.getFeed({ cursor: cache.nextCursor });
  cache.transaction(() => cache.upsert(page.items, page.nextCursor));
}
// #endregion
