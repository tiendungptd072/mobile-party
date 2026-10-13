// #region show
function PhotoTile({ photo }: Props) {
  return <Image source={{ uri: photo.url }} style={{ flex: 1, aspectRatio: 1 }} resizeMode="cover" />;
}
// #endregion
