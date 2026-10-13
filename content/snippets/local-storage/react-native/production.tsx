// #region show
type StoredSettings = { version: 2; theme: Theme };

async function readSettings(): Promise<StoredSettings> {
  const raw = await AsyncStorage.getItem("settings");
  return migrateSettings(raw ? JSON.parse(raw) : undefined);
}
// #endregion
