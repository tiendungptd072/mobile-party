// #region show
const updated = {
  ...state,
  users: state.users.map((user) =>
    user.id === id ? { ...user, selected: true } : user,
  ),
};
// #endregion
