// #region show
async function refreshOnce() {
  if (!refreshPromise) {
    refreshPromise = auth.refresh().finally(() => { refreshPromise = undefined; });
  }
  return refreshPromise;
}
// #endregion
