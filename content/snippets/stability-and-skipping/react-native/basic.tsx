type Props = { id: string; name: string };

// #region show
const UserRow = memo(function UserRow({ id, name }: Props) {
  return <Text>{name}</Text>;
});
// #endregion
