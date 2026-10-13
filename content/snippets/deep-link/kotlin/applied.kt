package snippets.deep_link.applied

// #region show
composable<ProfileRoute> { entry ->
    val userId = UserId.parse(entry.toRoute<ProfileRoute>().userId)
    if (userId == null) InvalidLinkScreen()
    else AuthorizedProfileRoute(userId)
}
// #endregion
