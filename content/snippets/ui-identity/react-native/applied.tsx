// #region show
const sorted = [...posts].sort(byNewest);
<FlatList
  data={sorted}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <EditablePost post={item} />}
/>
// #endregion
