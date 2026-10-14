declare function useProfile(id: string): Profile;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile;
}>;

// #region show
function ProfileRoute({ id }: { id: string }) {
  const profile = useProfile(id);
  return <ProfileScreen profile={profile} />;
}
// #endregion
