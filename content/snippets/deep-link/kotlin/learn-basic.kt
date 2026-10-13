package snippets.deep_link.learn_basic

// #region show
composable<ProfileRoute>(
    deepLinks = listOf(
        navDeepLink { uriPattern = "https://example.com/users/{userId}" },
    ),
) { entry -> ProfileRoute(entry.toRoute<ProfileRoute>().userId) }
// #endregion
