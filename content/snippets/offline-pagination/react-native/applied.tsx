type Page = { items: Post[]; nextCursor: string | null };
declare const api: { getFeed(params: { cursor: string }): Promise<Page> };
declare const page: Page;
declare const cache: {
  nextCursor: string | null;
  transaction(action: () => void): void;
  upsert(items: Post[], cursor?: string | null): void;
};

// #region show
type FeedState = { items: Post[]; appendError?: Error; nextCursor: string | null };
// Retry reads state.nextCursor; it does not replace state.items.
// #endregion
