package snippets.state_driven_animation.production

import verification.support.*
import androidx.compose.animation.core.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
@Composable fun VerificationSnippet() {
// #region show
val transition = updateTransition(targetState = expanded, label = "article")
val alpha by transition.animateFloat(label = "alpha") { if (it) 1f else 0f }
val scale by transition.animateFloat(label = "scale") { if (it) 1f else 0.96f }
ArticleDetails(Modifier.graphicsLayer(alpha = alpha, scaleX = scale, scaleY = scale))
// #endregion

}
