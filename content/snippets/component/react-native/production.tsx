// #region show
function ProfileRoute() {
  const model = useProfile();
  return <ProfileScreen state={model.state} onRetry={model.retry} />;
}
// #endregion
