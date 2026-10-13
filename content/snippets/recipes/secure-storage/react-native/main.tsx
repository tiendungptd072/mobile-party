// #region show
export async function saveToken(token: string) {
  await secureStorage.setItem("access-token", token);
}
export async function clearToken() {
  await secureStorage.removeItem("access-token");
}
// #endregion
