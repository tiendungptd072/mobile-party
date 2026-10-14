type UserDto = { id: string; name: string };

// #region show
function loadAvatar(user: User, images: ImageRepository) {
  return images.load(user.avatarUrl);
}
// #endregion
