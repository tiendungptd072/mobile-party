package snippets.deep_link.basic

// #region show
composable<Profile>(
    deepLinks = listOf(navDeepLink {
        uriPattern = "mobileparty://profiles/{userId}"
    }),
) { entry ->
    ProfileScreen(entry.toRoute<Profile>().userId)
}
// #endregion
