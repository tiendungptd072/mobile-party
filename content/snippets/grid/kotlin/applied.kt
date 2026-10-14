package snippets.grid.applied

import verification.support.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
LazyVerticalGrid(columns = GridCells.Adaptive(160.dp)) {
    items(photos, key = { it.id }) { photo -> PhotoTile(photo) }
}
// #endregion

}
