// #region show
function UserRow({ name, onOpen }: Props) {
  return <Pressable onPress={onOpen}><Text>{name}</Text></Pressable>;
}
// #endregion
