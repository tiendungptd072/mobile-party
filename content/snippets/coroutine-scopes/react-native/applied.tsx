// #region show
useEffect(() => {
  const controller = new AbortController();
  setHasError(false);
  void repository.search(query, controller.signal)
    .then((items) => { if (!controller.signal.aborted) setItems(items); })
    .catch(() => { if (!controller.signal.aborted) setHasError(true); });
  return () => controller.abort();
}, [query, repository]);
// #endregion
