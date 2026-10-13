// #region show
useEffect(() => {
  let mounted = true;
  const open = (url: string) =>
    navigate(parseDestination(url) ?? { kind: "invalid-link" });
  void Linking.getInitialURL().then((url) => {
    if (mounted && url) open(url);
  }).catch(() => { if (mounted) showUnavailable(); });
  const subscription = Linking.addEventListener("url", ({ url }) => open(url));
  return () => { mounted = false; subscription.remove(); };
}, [navigate, showUnavailable]);
// #endregion
