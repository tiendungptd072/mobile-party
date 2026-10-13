// #region show
useEffect(() => {
  const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
    if (!hasUnsavedChanges) return false;
    setShowDiscardDialog(true);
    return true;
  });
  return () => subscription.remove();
}, [hasUnsavedChanges]);
// #endregion
