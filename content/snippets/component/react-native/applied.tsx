// #region show
function ProfileCard({ profile, onOpen }: Props) {
  return <Pressable onPress={onOpen}><Text>{profile.name}</Text></Pressable>;
}
// #endregion
