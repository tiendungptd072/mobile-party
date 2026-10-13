// #region show
cache.transaction(() => {
  cache.upsert(page.items);
  cache.nextCursor = page.nextCursor;
});
// #endregion
