// #region show
function ProfileRoute({ navigation }: Props) {
  return <ProfileScreen onEdit={() => navigation.navigate("EditProfile")} />;
}

function ProfileScreen({ onEdit }: ScreenProps) {
  return <Button title="Edit" onPress={onEdit} />;
}
// #endregion
