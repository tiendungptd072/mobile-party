declare const items: Post[];

// #region show
<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow user={item} onPress={() => onSelect(item.id)} />}
/>
// #endregion
