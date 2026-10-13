package snippets.global_state.production

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
