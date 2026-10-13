// #region show
const api = axios.create({ baseURL: "https://api.example.com/" });

async function getUser(id: string, signal: AbortSignal): Promise<User> {
  const response = await api.get<User>(`users/${encodeURIComponent(id)}`, { signal });
  return response.data;
}
// #endregion
