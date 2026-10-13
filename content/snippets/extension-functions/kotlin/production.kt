package snippets.extension_functions.production

// #region show
suspend fun User.loadAvatar(images: ImageRepository): Image {
    return images.load(avatarUrl)
}
// #endregion
