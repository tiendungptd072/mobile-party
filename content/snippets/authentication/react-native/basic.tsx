// #region show
function AppGate() {
  const { status } = useSession();
  if (status === "restoring") return <SplashScreen />;
  return status === "signedIn" ? <AppNavigator /> : <AuthNavigator />;
}
// #endregion
