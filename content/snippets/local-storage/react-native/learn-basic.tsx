declare function migrateSettings(value: unknown): { version: 2; theme: Theme };

// #region show
await AsyncStorage.setItem("theme", "dark");
const theme = await AsyncStorage.getItem("theme");
// #endregion
