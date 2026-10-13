package snippets.route_parameters.learn_basic

// #region show
@Serializable
data class ProfileRoute(val userId: String)

navController.navigate(ProfileRoute(user.id))
// #endregion
