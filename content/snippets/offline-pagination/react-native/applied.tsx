// #region show
type FeedState = { items: Post[]; appendError?: Error; nextCursor: string | null };
// Retry reads state.nextCursor; it does not replace state.items.
// #endregion
