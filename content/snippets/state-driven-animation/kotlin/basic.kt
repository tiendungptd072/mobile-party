package snippets.state_driven_animation.basic

import verification.support.*
import androidx.compose.animation.core.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
@Composable fun VerificationSnippet() {
// #region show
val scale by animateFloatAsState(
    targetValue = if (isFavorite) 1.2f else 1f,
    label = "favorite scale",
)
Icon(Icons.Default.Favorite, null, Modifier.scale(scale))
// #endregion

}
