type Props = { photo: { id: string; url: string } };

// #region show
<FlatList data={photos} numColumns={2} renderItem={({ item }) => <PhotoTile photo={item} />} />
// #endregion
