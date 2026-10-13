// #region show
await Keychain.setGenericPassword("session", token, {
  service: "com.example.session",
});
// #endregion
