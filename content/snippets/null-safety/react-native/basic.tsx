// #region show
function displayName(user: User | null): string {
  return user?.profile?.name ?? "Guest";
}
// #endregion
