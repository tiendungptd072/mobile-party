package snippets.local_storage.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
val settingsVersionKey = intPreferencesKey("settings-version"); fun migrateSettings(old: StoredSettings): StoredSettings = TODO()
