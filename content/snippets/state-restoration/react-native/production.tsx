type Props = { query: string; onQueryChange(value: string): void };
declare function useProfile(id: string): Profile | null;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile;
}>;

// #region show
type ProfileRouteProps = { route: { params: { userId: string } } };

function ProfileRoute({ route }: ProfileRouteProps) {
  const profile = useProfile(route.params.userId);
  if (!profile) return <ActivityIndicator />;
  return <ProfileScreen profile={profile} />;
}
// #endregion
