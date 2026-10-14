type User = { id: string; displayName: string };
type UserDto = { id: string; display_name: string };
declare const api: {
  getUser(id: string, signal: AbortSignal): Promise<UserDto>;
};
declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
};

// #region show
async function loadUser(id: string, signal: AbortSignal): Promise<Result<User, UserError>> {
  try { return { ok: true, value: await repository.getUser(id, signal) }; }
  catch (error) {
    if (signal.aborted) throw error;
    return { ok: false, error: mapUserError(error) };
  }
}
// #endregion
