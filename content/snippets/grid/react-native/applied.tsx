type Props = { photo: { id: string; url: string } };

// #region show
<FlatList
  data={photos}
  numColumns={columns}
  keyExtractor={(photo) => photo.id}
  renderItem={({ item }) => <PhotoTile photo={item} />}
/>
// #endregion
