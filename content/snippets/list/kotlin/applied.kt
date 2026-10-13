package snippets.list.applied

// #region show
LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(user, onClick = { onSelect(user.id) })
    }
}
// #endregion
