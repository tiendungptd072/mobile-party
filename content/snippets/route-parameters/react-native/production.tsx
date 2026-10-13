// #region show
function useProfile(userId: string) {
  const [state, setState] = useState<ProfileState>({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    void profileRepository.loadAuthorized(userId, controller.signal).then(
      (profile) => {
        if (!controller.signal.aborted) setState({ status: "ready", profile });
      },
      () => {
        if (!controller.signal.aborted) setState({ status: "unavailable" });
      },
    );
    return () => controller.abort();
  }, [userId]);
  return state;
}
// #endregion
