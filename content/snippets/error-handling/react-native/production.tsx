type Props = { state: ProfileState; retry(): void };
declare const repository: { load(signal: AbortSignal): Promise<Profile> };

// #region show
async function load(signal: AbortSignal) {
  try { return await repository.load(signal); }
  catch (error) {
    if (signal.aborted) throw error;
    return { status: "error", retry: () => reload() };
  }
}
// #endregion
