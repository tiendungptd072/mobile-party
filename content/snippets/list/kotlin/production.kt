package snippets.list.production

// #region show
if (items.isEmpty()) EmptyView(onRetry)
else LazyColumn { items(items, key = { it.id }) { item -> ItemRow(item) } }
// #endregion
