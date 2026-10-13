// #region show
async function openHelp() {
  try {
    await Linking.openURL("https://example.com/help");
  } catch {
    showUnavailable();
  }
}
// #endregion
