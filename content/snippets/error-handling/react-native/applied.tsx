// #region show
function toProfileError(error: unknown): ProfileError {
  if (error instanceof OfflineError) return { type: "offline" };
  if (error instanceof NotFoundError) return { type: "notFound" };
  return { type: "unknown" };
}
// #endregion
