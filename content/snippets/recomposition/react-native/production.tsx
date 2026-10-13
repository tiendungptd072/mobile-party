// #region show
function ProfileRoute({ id }: { id: string }) {
  const profile = useProfile(id);
  return <ProfileScreen profile={profile} />;
}
// #endregion
