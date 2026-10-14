package snippets.navigation.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.datastore.preferences.core.*
import androidx.navigation.*
import androidx.navigation.compose.*
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
