package snippets.grid.learn_basic

// #region show
LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { photo -> PhotoTile(photo) }
}
// #endregion
