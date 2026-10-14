type Props = {
  navigation: import("@react-navigation/native-stack").NativeStackNavigationProp<{
    Profile: { userId: string };
    EditProfile: undefined;
  }>;
};
type ScreenProps = { onEdit(): void };

// #region show
function ProfileRoute({ navigation }: Props) {
  return <ProfileScreen onEdit={() => navigation.navigate("EditProfile")} />;
}

function ProfileScreen({ onEdit }: ScreenProps) {
  return <Button title="Edit" onPress={onEdit} />;
}
// #endregion
