package snippets.route_parameters.applied

// #region show
composable<ProfileRoute> { entry ->
    val route = entry.toRoute<ProfileRoute>()
    ProfileRoute(userId = route.userId)
}
// #endregion
