declare function matchesQuery(user: User, query: string): boolean;
type User = { id: string; displayName: string; isActive: boolean };
declare const users: User[];
declare const responses: unknown[];
declare function parseUser(value: unknown): User | null;

// #region show
const visibleNames = users.reduce<string[]>((result, user) => {
  if (user.isActive && matchesQuery(user, query)) {
    result.push(user.displayName);
  }
  return result;
}, []);
// #endregion
