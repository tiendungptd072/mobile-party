package snippets.local_storage.learn_basic

import verification.support.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
// #region show
suspend fun saveTheme(theme: String) {
    dataStore.edit { it[themeKey] = theme }
}
val theme = dataStore.data.map { it[themeKey] }
// #endregion
