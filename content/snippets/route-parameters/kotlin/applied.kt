package snippets.route_parameters.applied

import verification.support.*
import androidx.navigation.*
import androidx.navigation.compose.*
fun NavGraphBuilder.verificationNavigation() {
// #region show
composable<ProfileDestination> { entry ->
    val route = entry.toRoute<ProfileDestination>()
    ProfileRoute(userId = route.userId)
}
// #endregion

}
