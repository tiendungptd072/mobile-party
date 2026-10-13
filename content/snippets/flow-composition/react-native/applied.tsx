// #region show
try {
  await repository.refresh();
  state = { ...state, refreshError: null };
} catch (error) {
  state = { ...state, refreshError: toFeedError(error) };
}
// #endregion
