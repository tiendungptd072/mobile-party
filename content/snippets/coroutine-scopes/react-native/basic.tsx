// #region show
useEffect(() => {
  const controller = new AbortController();
  setHasError(false);
  void repository.loadUser(userId, controller.signal)
    .then((user) => { if (!controller.signal.aborted) setUser(user); })
    .catch(() => { if (!controller.signal.aborted) setHasError(true); });
  return () => controller.abort();
}, [repository, userId]);
// #endregion
