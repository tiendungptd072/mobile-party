package snippets.local_storage.production

import verification.support.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
import java.io.IOException
// #region show
data class StoredSettings(val version: Int, val theme: Theme)

val settings = dataStore.data
    .catch { error -> if (error is IOException) emit(emptyPreferences()) else throw error }
    .map { preferences ->
        val stored = StoredSettings(
            version = preferences[settingsVersionKey] ?: 1,
            theme = Theme.fromStoredValue(preferences[themeKey]) ?: Theme.System,
        )
        migrateSettings(stored)
    }
// #endregion
