package snippets.local_storage.basic

import verification.support.*
import android.content.*
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.*
import androidx.compose.runtime.*
// #region show
val Context.dataStore by preferencesDataStore(name = "settings")
val themeKey = stringPreferencesKey("theme")

val Context.theme: Flow<String?>
  get() = dataStore.data.map { it[themeKey] }

suspend fun Context.saveTheme(theme: String) {
  dataStore.edit { it[themeKey] = theme }
}
// #endregion
