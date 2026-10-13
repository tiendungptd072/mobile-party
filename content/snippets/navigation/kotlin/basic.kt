package snippets.navigation.basic

// #region show
@Composable
fun HomeRoute(navController: NavController) {
    HomeScreen(onOpenProfile = { userId ->
        navController.navigate(Profile(userId))
    })
}
// #endregion
