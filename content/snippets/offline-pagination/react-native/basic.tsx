// #region show
async function append() {
  if (cache.nextCursor === null) return;
  const page = await api.getFeed({ cursor: cache.nextCursor });
  cache.transaction(() => cache.upsert(page.items, page.nextCursor));
}
// #endregion
