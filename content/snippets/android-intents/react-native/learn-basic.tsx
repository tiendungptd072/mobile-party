// #region show
try {
  await Linking.openURL("https://example.com/help");
} catch {
  showUnavailable();
}
// #endregion
