package snippets.accessibility_semantics.basic

import verification.support.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
IconToggleButton(checked = isFavorite, onCheckedChange = onToggle) {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Favorite article",
    )
}
// #endregion

}
