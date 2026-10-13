package snippets.navigation.applied

// #region show
@Composable
fun ProfileRoute(navController: NavController) {
    ProfileScreen(onEdit = { navController.navigate("edit-profile") })
}

@Composable
fun ProfileScreen(onEdit: () -> Unit) {
    Button(onClick = onEdit) { Text("Edit") }
}
// #endregion
