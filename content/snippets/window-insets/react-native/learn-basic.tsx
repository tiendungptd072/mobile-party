// #region show
function Header() {
  const insets = useSafeAreaInsets();
  return <View style={{ paddingTop: insets.top }}><HeaderActions /></View>;
}
// #endregion
