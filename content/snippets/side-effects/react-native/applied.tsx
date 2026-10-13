// #region show
useEffect(() => {
  const subscription = AppState.addEventListener("change", onChange);
  return () => subscription.remove();
}, [onChange]);
// #endregion
