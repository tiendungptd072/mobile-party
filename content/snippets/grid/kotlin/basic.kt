package snippets.grid.basic

// #region show
LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 160.dp)) {
  items(photos, key = { it.id }) { photo ->
    PhotoTile(photo)
  }
}
// #endregion
