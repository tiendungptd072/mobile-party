// #region show
function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);
  return <Profile user={user} onSignOut={signOut} />;
}
// #endregion
