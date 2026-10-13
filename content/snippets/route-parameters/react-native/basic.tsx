// #region show
function ProfileScreen({ route }: Props) {
  const { userId } = route.params;
  const user = useUser(userId);
  return <Profile user={user} />;
}
// #endregion
