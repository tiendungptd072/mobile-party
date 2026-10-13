// #region show
await sessionMutex.runExclusive(async () => {
  await credentialStore.clear();
  sessionStore.setState({ status: "signedOut" });
});
// #endregion
