// #region show
await Keychain.setGenericPassword("session", refreshToken);

export async function loadRefreshToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
}
// #endregion
