// #region show
useEffect(() => {
  if (!query) return;
  const timer = setTimeout(() => onSearch(query), 300);
  return () => clearTimeout(timer);
}, [query, onSearch]);
// #endregion
