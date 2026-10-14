type Page = { items: Post[]; nextCursor: string | null };
declare const api: { getFeed(params: { cursor: string }): Promise<Page> };
declare const page: Page;
declare const cache: {
  nextCursor: string | null;
  transaction(action: () => void): void;
  upsert(items: Post[], cursor?: string | null): void;
};

// #region show
await storage.setItem("feed-next-cursor", JSON.stringify(cache.nextCursor));
// #endregion
