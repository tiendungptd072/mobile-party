package snippets.sealed_types.applied

// #region show
sealed interface SubmitState {
    data object Idle : SubmitState
    data object Submitting : SubmitState
    data class Failed(val message: String) : SubmitState
    data class Succeeded(val userId: String) : SubmitState
}
// #endregion
