type UserDto = { id: string; name: string | null; avatarUrl: string | null };

// #region show
function avatarUrl(user: User | null): string {
  return user?.avatarUrl ?? fallbackAvatar;
}
// #endregion
