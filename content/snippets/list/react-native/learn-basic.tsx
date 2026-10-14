declare const items: Post[];

// #region show
<FlatList data={users} renderItem={({ item }) => <UserRow user={item} />} />
// #endregion
