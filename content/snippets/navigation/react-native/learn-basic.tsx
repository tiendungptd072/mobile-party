declare const navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<{
  Profile: undefined;
}>;
type Props = {
  navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<{
    Profile: { userId: string };
    EditProfile: undefined;
  }>;
};
type ScreenProps = { onEdit(): void };

// #region show
<Button title="Open profile" onPress={() => navigation.navigate("Profile")} />
// #endregion
