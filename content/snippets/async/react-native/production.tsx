// #region show
function useProfile(id: string) {
  const [state, setState] = useState<ProfileState>({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    void repository.load(id, controller.signal).then(
      (profile) => {
        if (!controller.signal.aborted) setState({ status: "ready", profile });
      },
      () => {
        if (!controller.signal.aborted) setState({ status: "error" });
      },
    );
    return () => controller.abort();
  }, [id]);
  return state;
}
// #endregion
