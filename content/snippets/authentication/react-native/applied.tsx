// #region show
async function restoreSession() {
  const token = await credentialStore.readRefreshToken();
  if (!token) return setSession({ status: "signedOut" });
  const user = await auth.refresh(token);
  setSession({ status: "signedIn", user });
}
// #endregion
