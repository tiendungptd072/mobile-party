// #region show
useEffect(() => {
  if (!hasUnsavedChanges) return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", confirmDiscard);
  return () => subscription.remove();
}, [hasUnsavedChanges, confirmDiscard]);
// #endregion
