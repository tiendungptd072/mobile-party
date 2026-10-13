// #region show
const usersById = new Map(
  responses
    .map(parseUser)
    .filter((user): user is User => user !== null)
    .map((user) => [user.id, user]),
);
// #endregion
