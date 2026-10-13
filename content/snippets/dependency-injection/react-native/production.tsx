// #region show
export function createAppDependencies() {
  const client = new ApiClient();
  return { profileRepository: new HttpProfileRepository(client) };
}
// #endregion
