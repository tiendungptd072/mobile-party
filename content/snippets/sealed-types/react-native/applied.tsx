// #region show
type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "failed"; message: string }
  | { status: "succeeded"; userId: string };
// #endregion
