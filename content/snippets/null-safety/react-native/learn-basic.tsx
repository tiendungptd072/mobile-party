// #region show
function avatarUrl(user: User | null): string {
  return user?.avatarUrl ?? fallbackAvatar;
}
// #endregion
