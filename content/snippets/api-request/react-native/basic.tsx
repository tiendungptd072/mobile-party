type User = { id: string; displayName: string };
type UserDto = { id: string; display_name: string };
declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
};

// #region show
const api = axios.create({ baseURL: "https://api.example.com/" });

async function getUser(id: string, signal: AbortSignal): Promise<User> {
  const response = await api.get<User>(`users/${encodeURIComponent(id)}`, { signal });
  return response.data;
}
// #endregion
