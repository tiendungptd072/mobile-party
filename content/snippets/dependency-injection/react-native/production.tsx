declare const ProfileRoute: import("react").ComponentType<{
  repository: ProfileRepository;
}>;

// #region show
export function createAppDependencies() {
  const client = new ApiClient();
  return { profileRepository: new HttpProfileRepository(client) };
}
// #endregion
