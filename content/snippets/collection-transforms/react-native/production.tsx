// #region show
const visibleNames = users.reduce<string[]>((result, user) => {
  if (user.isActive && matchesQuery(user, query)) {
    result.push(user.displayName);
  }
  return result;
}, []);
// #endregion
