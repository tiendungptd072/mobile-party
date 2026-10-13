// #region show
type AppResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };

async function loadUser(): Promise<AppResult<User>> {
  return repository.loadUser();
}
// #endregion
