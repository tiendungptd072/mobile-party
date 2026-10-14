type Props = { user: User; onSelect(id: string): void };

// #region show
type ProfileHeaderProps = {
  displayName: string;
  avatarUrl?: string;
  onEdit: () => void;
};

function ProfileHeader({ displayName, avatarUrl, onEdit }: ProfileHeaderProps) {
  return <View>
    {avatarUrl && <Image source={{ uri: avatarUrl }} />}
    <Text>{displayName}</Text>
    <Button title="Edit" onPress={onEdit} />
  </View>;
}
// #endregion
