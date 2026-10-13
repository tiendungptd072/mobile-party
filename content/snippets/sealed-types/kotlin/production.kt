package snippets.sealed_types.production

// #region show
@Composable
fun SubmitContent(state: SubmitState) = when (state) {
    SubmitState.Idle -> Form()
    SubmitState.Submitting -> Spinner()
    is SubmitState.Failed -> ErrorPanel(state.message)
    is SubmitState.Succeeded -> Success(state.userId)
}
// #endregion
