// #region show
useEffect(() => {
  const unsubscribe = netInfo.addEventListener(setConnection);
  return unsubscribe;
}, []);
// #endregion
