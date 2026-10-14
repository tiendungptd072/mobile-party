type UserDto = { id: string; name: string | null; avatarUrl: string | null };

// #region show
function displayName(user: User | null): string {
  return user?.profile?.name ?? "Guest";
}
// #endregion
