// #region show
async function readTheme(): Promise<Theme> {
  const value = await AsyncStorage.getItem("theme");
  return value === "light" || value === "dark" ? value : "system";
}
// #endregion
