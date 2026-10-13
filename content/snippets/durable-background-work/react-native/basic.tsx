// #region show
AppRegistry.registerHeadlessTask("SyncPending", () => async () => {
  await syncRepository.syncPending();
});
// #endregion
