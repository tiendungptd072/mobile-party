declare const ProfileRoute: import("react").ComponentType<{
  repository: ProfileRepository;
}>;

// #region show
function AppRoot() {
  const repository = new HttpProfileRepository(apiClient);
  return <ProfileRoute repository={repository} />;
}
// #endregion
