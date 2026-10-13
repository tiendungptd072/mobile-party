package snippets.data_classes.production

// #region show
data class ProfileUiModel(
    val id: String,
    val displayName: String,
    val tags: List<String>,
)

val uiModel = profile.toUiModel()
// #endregion
