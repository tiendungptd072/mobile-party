// #region show
type OnSelect = (id: string) => void;

function UserRow({ user, onSelect }: { user: User; onSelect: OnSelect }) {
  return <Pressable onPress={() => onSelect(user.id)}><Text>{user.name}</Text></Pressable>;
}
// #endregion
