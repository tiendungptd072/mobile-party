// #region show
async function resumeSession() {
  const verified = await biometrics.authenticate("Unlock your session");
  if (!verified) return false;
  const token = await credentialStore.readToken();
  return Boolean(token);
}
// #endregion
