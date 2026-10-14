package snippets.data_classes.production

import verification.support.*
fun Profile.toUiModel() = ProfileUiModel(id, name, emptyList())
// #region show
data class ProfileUiModel(
    val id: String,
    val displayName: String,
    val tags: List<String>,
)

val uiModel = profile.toUiModel()
// #endregion
