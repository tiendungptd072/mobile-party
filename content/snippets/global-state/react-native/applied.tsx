// #region show
function ProfileRoute() {
  const model = useProfileScreen();
  return <ProfileScreen state={model.state} onRename={model.rename} />;
}

function ProfileScreen({ state, onRename }: ScreenProps) {
  return <ProfileForm name={state.name} onRename={onRename} />;
}
// #endregion
