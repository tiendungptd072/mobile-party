package snippets.state_driven_animation.basic

// #region show
val scale by animateFloatAsState(
    targetValue = if (isFavorite) 1.2f else 1f,
    label = "favorite scale",
)
Icon(Icons.Default.Favorite, null, Modifier.scale(scale))
// #endregion
