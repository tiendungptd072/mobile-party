// #region show
useEffect(() => {
  const controller = new AbortController();
  void loadUser(userId, controller.signal)
    .then((user) => {
      if (!controller.signal.aborted) setUser(user);
    })
    .catch((error) => {
      if (!controller.signal.aborted) reportError(error);
    });
  return () => controller.abort();
}, [userId]);
// #endregion
