package snippets.global_state.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.*
import androidx.navigation.compose.*
fun NavGraphBuilder.verificationNavigation() {
// #region show
navigation(startDestination = "cart", route = "checkout") {
    composable("cart") { entry ->
        val parent = remember(entry) {
            navController.getBackStackEntry("checkout")
        }
        val viewModel: CheckoutViewModel = viewModel(viewModelStoreOwner = parent)
        CartRoute(viewModel)
    }
}
// #endregion

}
