package snippets.null_safety.learn_basic

// #region show
fun avatarUrl(user: User?): String {
    return user?.avatarUrl ?: fallbackAvatar
}
// #endregion
