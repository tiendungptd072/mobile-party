package snippets.recipes.deep_links

// #region show
composable(
    route = "profile/{profileId}",
    deepLinks = listOf(
        navDeepLink { uriPattern = "mobileparty://profiles/{profileId}" },
        navDeepLink { uriPattern = "https://mobile.party/profiles/{profileId}" },
    ),
) { entry ->
    val profileId = entry.arguments?.getString("profileId")
        ?.takeIf(String::isNotBlank)
    if (profileId == null) InvalidLinkScreen()
    else ProfileScreen(profileId)
}
// #endregion
