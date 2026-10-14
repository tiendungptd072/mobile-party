package snippets.navigation.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.navigation.*
import androidx.navigation.compose.*
// #region show
@Composable
fun HomeRoute(navController: NavController) {
    HomeScreen(onOpenProfile = { userId ->
        navController.navigate(Profile(userId))
    })
}
// #endregion
