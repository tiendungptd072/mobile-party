// #region show
const latestOnTimeout = useRef(onTimeout);
useEffect(() => {
  latestOnTimeout.current = onTimeout;
}, [onTimeout]);

useEffect(() => {
  const timer = setTimeout(() => latestOnTimeout.current(), 2_000);
  return () => clearTimeout(timer);
}, []);
// #endregion
