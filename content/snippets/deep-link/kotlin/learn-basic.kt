package snippets.deep_link.learn_basic

import verification.support.*
import androidx.navigation.*
import androidx.navigation.compose.*
fun NavGraphBuilder.verificationNavigation() {
// #region show
composable<ProfileDestination>(
    deepLinks = listOf(
        navDeepLink { uriPattern = "https://example.com/users/{userId}" },
    ),
) { entry -> ProfileRoute(entry.toRoute<ProfileDestination>().userId) }
// #endregion

}
