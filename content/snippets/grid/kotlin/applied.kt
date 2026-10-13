package snippets.grid.applied

// #region show
LazyVerticalGrid(columns = GridCells.Adaptive(160.dp)) {
    items(photos, key = { it.id }) { photo -> PhotoTile(photo) }
}
// #endregion
