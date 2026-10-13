// #region show
useEffect(() => {
  const controller = new AbortController();
  loadProfile(userId, controller.signal);
  return () => controller.abort();
}, [userId]);
// #endregion
