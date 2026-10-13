// #region show
function HomeScreen({ navigation }: Props) {
  return (
    <Button
      title="Open profile"
      onPress={() => navigation.navigate("Profile", { userId: "42" })}
    />
  );
}
// #endregion
