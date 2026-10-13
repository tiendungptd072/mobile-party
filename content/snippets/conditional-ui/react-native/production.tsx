// #region show
type UiState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; retryable: boolean }
  | { status: "ready"; data: Profile };
// #endregion
