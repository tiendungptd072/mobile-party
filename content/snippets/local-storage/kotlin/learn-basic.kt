package snippets.local_storage.learn_basic

// #region show
suspend fun saveTheme(theme: String) {
    dataStore.edit { it[themeKey] = theme }
}
val theme = dataStore.data.map { it[themeKey] }
// #endregion
