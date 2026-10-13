// #region show
function ProfileScreen({ name }: { name: string }) {
  const spacing = useContext(SpacingContext);
  return <View style={{ padding: spacing }}><Text>{name}</Text></View>;
}
// #endregion
