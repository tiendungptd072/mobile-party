declare const sessionStore: {
  subscribe(listener: () => void): () => void;
  getSnapshot(): Session;
};
// #region show
function useSession() {
  return useSyncExternalStore(
    sessionStore.subscribe,
    sessionStore.getSnapshot,
    sessionStore.getSnapshot,
  );
}
// #endregion
