package snippets.grid.learn_basic

import verification.support.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { photo -> PhotoTile(photo) }
}
// #endregion

}
