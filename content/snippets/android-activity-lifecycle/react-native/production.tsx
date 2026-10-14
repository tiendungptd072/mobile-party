declare const sessionStore: {
  subscribe(listener: () => void): () => void;
  getSnapshot(): Session;
};
declare const repository: {
  watchItems(listener: (items: Post[]) => void): () => void;
};
// #region show
useEffect(() => {
  let stop: (() => void) | undefined;
  const sync = (state: AppStateStatus | null) => {
    const active = state === "active";
    if (active === Boolean(stop)) return;
    if (active) stop = repository.watchItems(setItems);
    else { stop?.(); stop = undefined; }
  };
  sync(AppState.currentState);
  const subscription = AppState.addEventListener("change", sync);
  return () => { subscription.remove(); stop?.(); };
}, [repository]);
// #endregion
