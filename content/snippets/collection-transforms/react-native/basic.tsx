declare function matchesQuery(user: User, query: string): boolean;
type User = { id: string; displayName: string; isActive: boolean };
declare const users: User[];
declare const responses: unknown[];
declare function parseUser(value: unknown): User | null;

// #region show
const names = users
  .filter((user) => user.isActive)
  .map((user) => user.displayName);
// #endregion
