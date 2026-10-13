// #region show
const names = users
  .filter((user) => user.isActive)
  .map((user) => user.displayName);
// #endregion
