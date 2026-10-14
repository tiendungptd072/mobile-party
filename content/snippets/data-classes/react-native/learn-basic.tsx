declare const state: { users: (User & { selected: boolean })[] };

// #region show
type User = Readonly<{ id: string; name: string }>;
const renamed = { ...user, name: "Linh" };
// #endregion
