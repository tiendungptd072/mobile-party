package snippets.deep_link.applied

import verification.support.*
import androidx.navigation.*
import androidx.navigation.compose.*
fun NavGraphBuilder.verificationNavigation() {
// #region show
composable<ProfileRoute> { entry ->
    val userId = UserId.parse(entry.toRoute<ProfileRoute>().userId)
    if (userId == null) InvalidLinkScreen()
    else AuthorizedProfileRoute(userId)
}
// #endregion

}
