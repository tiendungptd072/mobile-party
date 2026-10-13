// #region show
useEffect(() => {
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") analytics.trackVisible();
  });
  return () => subscription.remove();
}, [analytics]);
// #endregion
