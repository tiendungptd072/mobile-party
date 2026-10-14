package snippets.route_parameters.learn_basic

import verification.support.*
import androidx.navigation.*
import kotlinx.serialization.Serializable
// #region show
@Serializable
data class ProfileRoute(val userId: String)

fun openProfile(navController: NavController, user: User) {
    navController.navigate(ProfileRoute(user.id))
}
// #endregion
