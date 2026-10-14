package snippets.extension_functions.production

import verification.support.*
import androidx.compose.foundation.*
// #region show
suspend fun User.loadAvatar(images: ImageRepository): Image {
    return images.load(avatarUrl)
}
// #endregion
