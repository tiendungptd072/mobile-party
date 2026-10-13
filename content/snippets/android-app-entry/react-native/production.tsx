// #region show
async function initialDestination(): Promise<Destination> {
  const url = await Linking.getInitialURL();
  if (url == null) return { kind: "home" };
  return parseDestination(url) ?? { kind: "invalid-link" };
}
// #endregion
