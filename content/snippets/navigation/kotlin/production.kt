package snippets.navigation.production

import verification.support.*
import androidx.datastore.preferences.core.*
import androidx.navigation.*
import androidx.navigation.compose.*
// #region show
fun NavGraphBuilder.profileGraph(navController: NavController) {
    navigation(startDestination = "profile", route = "profile-graph") {
        composable("profile") {
            ProfileRoute(onEdit = { navController.navigate("edit-profile") })
        }
        composable("edit-profile") { EditProfileRoute() }
    }
}
// #endregion
