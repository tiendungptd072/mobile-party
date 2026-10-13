// #region show
type UserCardProps = {
  name: string;
  onOpen: () => void;
};

function UserCard({ name, onOpen }: UserCardProps) {
  return <Button title={name} onPress={onOpen} />;
}
// #endregion
