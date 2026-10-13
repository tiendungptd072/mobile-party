// #region show
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };
// #endregion
