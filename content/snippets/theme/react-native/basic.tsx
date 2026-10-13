// #region show
const theme = scheme === "dark" ? darkTheme : lightTheme;

<ThemeContext.Provider value={theme}>
  <AppNavigator />
</ThemeContext.Provider>
// #endregion
