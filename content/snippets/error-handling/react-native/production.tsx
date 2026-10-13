// #region show
async function load(signal: AbortSignal) {
  try { return await repository.load(signal); }
  catch (error) {
    if (signal.aborted) throw error;
    return { status: "error", retry: () => reload() };
  }
}
// #endregion
