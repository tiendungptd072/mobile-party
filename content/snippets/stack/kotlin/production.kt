package snippets.stack.production

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Box {
    Image(painter, contentDescription = description)
    IconButton(onClick = onPlay, modifier = Modifier.align(Alignment.Center)) {
        Icon(Icons.Default.PlayArrow, contentDescription = "Play video")
    }
}
// #endregion

}
