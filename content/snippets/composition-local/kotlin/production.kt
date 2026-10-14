package snippets.composition_local.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
// #region show
@Composable
fun ProfileScreen(name: String) {
    Box(Modifier.padding(LocalSpacing.current)) { Text(name) }
}
// #endregion
