// #region show
function UserRow({ user, onSelect }: Props) {
  return <Pressable onPress={() => onSelect(user.id)}><Text>{user.name}</Text></Pressable>;
}
// #endregion
