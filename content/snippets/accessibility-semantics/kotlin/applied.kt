package snippets.accessibility_semantics.applied

// #region show
IconToggleButton(checked = isFavorite, onCheckedChange = onToggle) {
    Icon(Icons.Default.Favorite, contentDescription = "Favorite article")
}
// #endregion
