// #region show
const current = useRef<AbortController | null>(null);
function reload() {
  current.current?.abort();
  const controller = new AbortController();
  current.current = controller;
  void repository.load(controller.signal)
    .then((profile) => {
      if (!controller.signal.aborted) setState({ kind: "ready", profile });
    })
    .catch(() => {
      if (!controller.signal.aborted) setState({ kind: "error" });
    });
}
useEffect(() => () => current.current?.abort(), []);
// #endregion
