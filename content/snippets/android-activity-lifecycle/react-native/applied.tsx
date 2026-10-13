// #region show
useEffect(() => {
  let running = false;
  const sync = (state: AppStateStatus | null) => {
    const active = state === "active";
    if (active === running) return;
    running = active;
    if (active) camera.startPreview();
    else camera.stopPreview();
  };
  sync(AppState.currentState);
  const subscription = AppState.addEventListener("change", sync);
  return () => { subscription.remove(); if (running) camera.stopPreview(); };
}, [camera]);
// #endregion
