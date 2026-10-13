// #region show
function AppGate() {
  const session = useSession();
  if (session.status === "restoring") return <SplashScreen />;
  return session.status === "signedIn" ? <AppNavigator /> : <AuthNavigator />;
}
// #endregion
