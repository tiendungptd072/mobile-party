// #region show
type User = Readonly<{ id: string; name: string }>;

const renamed: User = { ...user, name: "Linh" };
// #endregion
