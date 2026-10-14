declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
  load(id: string, signal: AbortSignal): Promise<Profile>;
};

// #region show
async function loadUser(id: string, signal: AbortSignal): Promise<User> {
  return repository.getUser(id, signal);
}
// #endregion
