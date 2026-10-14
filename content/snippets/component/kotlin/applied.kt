package snippets.component.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun ProfileCard(profile: Profile, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(profile.name) }
}
// #endregion
