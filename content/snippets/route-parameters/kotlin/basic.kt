package snippets.route_parameters.basic

// #region show
@Serializable
data class Profile(val userId: String)

composable<Profile> { entry ->
    ProfileScreen(userId = entry.toRoute<Profile>().userId)
}
// #endregion
