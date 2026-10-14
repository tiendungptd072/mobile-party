package snippets.deep_link.basic

import verification.support.*
import androidx.navigation.*
import androidx.navigation.compose.*
fun NavGraphBuilder.verificationNavigation() {
// #region show
composable<Profile>(
    deepLinks = listOf(navDeepLink {
        uriPattern = "mobileparty://profiles/{userId}"
    }),
) { entry ->
    ProfileScreen(entry.toRoute<Profile>().userId)
}
// #endregion

}
