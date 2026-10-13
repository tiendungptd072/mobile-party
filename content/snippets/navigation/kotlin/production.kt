package snippets.navigation.production

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
