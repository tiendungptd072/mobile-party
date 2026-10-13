// #region show
function ProfileRoute({ route }: Props) {
  const { userId } = route.params;
  const profile = useProfile(userId);
  return <ProfileScreen profile={profile} />;
}
// #endregion
