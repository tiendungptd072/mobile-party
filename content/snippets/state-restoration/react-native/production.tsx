// #region show
type ProfileRouteProps = { route: { params: { userId: string } } };

function ProfileRoute({ route }: ProfileRouteProps) {
  const profile = useProfile(route.params.userId);
  if (!profile) return <ActivityIndicator />;
  return <ProfileScreen profile={profile} />;
}
// #endregion
