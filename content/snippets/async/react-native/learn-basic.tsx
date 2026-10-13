// #region show
async function loadUser(id: string, signal: AbortSignal): Promise<User> {
  return repository.getUser(id, signal);
}
// #endregion
