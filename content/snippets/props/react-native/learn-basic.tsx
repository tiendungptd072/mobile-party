type Props = { user: User; onSelect(id: string): void };

// #region show
function UserName({ name }: { name: string }) {
  return <Text>{name}</Text>;
}
// #endregion
