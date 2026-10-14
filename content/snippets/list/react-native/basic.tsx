declare const items: Post[];

// #region show
<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow user={item} />}
/>
// #endregion
