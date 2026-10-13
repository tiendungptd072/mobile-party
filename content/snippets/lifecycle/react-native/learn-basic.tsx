// #region show
useEffect(() => {
  const unsubscribe = connectivity.subscribe(setIsOnline);
  return unsubscribe;
}, []);
// #endregion
