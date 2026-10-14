type Props = { id: string; name: string; onOpen(): void };

// #region show
const UserRow = memo(function UserRow({ name }: { name: string }) {
  return <Text>{name}</Text>;
});
// #endregion
