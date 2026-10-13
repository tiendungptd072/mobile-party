package snippets.local_storage.applied

// #region show
val theme: Flow<Theme> = dataStore.data.map { preferences ->
    Theme.fromStoredValue(preferences[themeKey]) ?: Theme.System
}
// #endregion
