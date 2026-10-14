type UserDto = { id: string; name: string };

// #region show
function displayName(user: User): string {
  return user.nickname?.trim() || user.name;
}

const label = displayName(user);
// #endregion
