declare const ProfileRoute: import("react").ComponentType<{
  repository: ProfileRepository;
}>;

// #region show
render(
  <ProfileRoute repository={new FakeProfileRepository(profile)} />,
);
// #endregion
