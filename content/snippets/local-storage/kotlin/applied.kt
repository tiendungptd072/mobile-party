package snippets.local_storage.applied

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
val theme: Flow<Theme> = dataStore.data.map { preferences ->
    Theme.fromStoredValue(preferences[themeKey]) ?: Theme.System
}
// #endregion
