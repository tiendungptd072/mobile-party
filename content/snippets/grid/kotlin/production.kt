package snippets.grid.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import coil3.compose.AsyncImage
// #region show
@Composable
fun PhotoTile(photo: Photo) {
    AsyncImage(model = photo.url, contentDescription = photo.description, modifier = Modifier.aspectRatio(1f), contentScale = ContentScale.Crop)
}
// #endregion
