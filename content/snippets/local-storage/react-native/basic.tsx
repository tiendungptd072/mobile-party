// #region show
const themeKey = "theme";

export async function saveTheme(theme: "light" | "dark") {
  await AsyncStorage.setItem(themeKey, theme);
}

export function loadTheme() {
  return AsyncStorage.getItem(themeKey);
}
// #endregion
