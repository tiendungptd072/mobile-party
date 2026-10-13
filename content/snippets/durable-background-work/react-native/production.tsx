// #region show
await pendingActions.enqueue({
  idempotencyKey: action.id,
  postId: action.postId,
  desiredBookmark: action.desiredBookmark,
});
// #endregion
