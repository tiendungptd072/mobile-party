// #region show
async function handleIncomingUrl(url: string) {
  const destination = parseAndValidateLink(url);
  if (!destination) return;
  if (!session.isSignedIn()) {
    pendingLinks.save(destination);
    return navigation.navigate("SignIn");
  }
  navigation.navigate(destination.name, destination.params);
}
// #endregion
