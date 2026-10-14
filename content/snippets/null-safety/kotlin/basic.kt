package snippets.null_safety.basic

import verification.support.*
// #region show
fun displayName(user: User?): String {
    return user?.profile?.name ?: "Guest"
}
// #endregion
