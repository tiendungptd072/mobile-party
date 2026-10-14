package snippets.route_parameters.basic

import verification.support.*
import androidx.navigation.*
import androidx.navigation.compose.*
import kotlinx.serialization.Serializable
// #region show
@Serializable
data class Profile(val userId: String)

fun NavGraphBuilder.profileGraph() {
    composable<Profile> { entry ->
        ProfileScreen(userId = entry.toRoute<Profile>().userId)
    }
}
// #endregion
