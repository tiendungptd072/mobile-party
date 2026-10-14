package snippets.null_safety.applied

import verification.support.*
fun navigate(destination: Profile) = Unit
// #region show
fun openProfile(params: RouteParams) {
    val id = params.userId ?: return showInvalidLink()
    navigate(Profile(id))
}
// #endregion
