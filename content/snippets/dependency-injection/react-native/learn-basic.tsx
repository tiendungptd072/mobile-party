// #region show
function AppRoot() {
  const repository = new HttpProfileRepository(apiClient);
  return <ProfileRoute repository={repository} />;
}
// #endregion
