package snippets.null_safety.applied

// #region show
fun openProfile(params: RouteParams) {
    val id = params.userId ?: return showInvalidLink()
    navigate(Profile(id))
}
// #endregion
