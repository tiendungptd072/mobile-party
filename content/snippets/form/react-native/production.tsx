// #region show
async function submit() {
  if (!state.canSubmit || state.status === "submitting") return;
  dispatch({ type: "submitStarted" });
  try {
    await auth.signIn(state.email, state.password);
    dispatch({ type: "submitSucceeded" });
  } catch {
    dispatch({ type: "submitFailed", message: "Unable to sign in" });
  }
}
// #endregion
