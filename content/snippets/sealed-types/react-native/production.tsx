// #region show
function renderState(state: SubmitState): ReactNode {
  switch (state.status) {
    case "idle": return <Form />;
    case "submitting": return <Spinner />;
    case "failed": return <ErrorPanel message={state.message} />;
    case "succeeded": return <Success userId={state.userId} />;
    default: return assertNever(state);
  }
}
// #endregion
