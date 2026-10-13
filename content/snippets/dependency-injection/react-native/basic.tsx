// #region show
const repository = new HttpProfileRepository(apiClient);

export function AppRoot() {
  return <ProfileRoute repository={repository} />;
}
// #endregion
