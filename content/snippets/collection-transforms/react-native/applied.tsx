declare function matchesQuery(user: User, query: string): boolean;
type User = { id: string; displayName: string; isActive: boolean };
declare const users: User[];
declare const responses: unknown[];
declare function parseUser(value: unknown): User | null;

// #region show
const usersById = new Map(
  responses
    .map(parseUser)
    .filter((user): user is User => user !== null)
    .map((user) => [user.id, user]),
);
// #endregion
