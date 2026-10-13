// #region show
<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
  <Avatar user={user} />
  <Text style={{ flex: 1 }}>{user.name}</Text>
  <IconButton icon="more" />
</View>
// #endregion
