package snippets.null_safety.basic

// #region show
fun displayName(user: User?): String {
    return user?.profile?.name ?: "Guest"
}
// #endregion
