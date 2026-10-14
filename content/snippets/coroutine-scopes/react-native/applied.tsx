declare const repository: {
  search(query: string, signal: AbortSignal): Promise<Post[]>;
  loadUser(id: string, signal: AbortSignal): Promise<User>;
  load(signal: AbortSignal): Promise<Profile>;
};
declare function setState(
  state: { kind: "ready"; profile: Profile } | { kind: "error" },
): void;

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
