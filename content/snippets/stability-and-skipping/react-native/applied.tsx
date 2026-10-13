// #region show
<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow name={item.name} />}
/>
// #endregion
