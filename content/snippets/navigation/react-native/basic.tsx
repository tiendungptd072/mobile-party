type Props = {
  navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<{
    Profile: { userId: string };
    EditProfile: undefined;
  }>;
};
type ScreenProps = { onEdit(): void };

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
