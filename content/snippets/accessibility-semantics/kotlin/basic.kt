package snippets.accessibility_semantics.basic

// #region show
IconToggleButton(checked = isFavorite, onCheckedChange = onToggle) {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Favorite article",
    )
}
// #endregion
