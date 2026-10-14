declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
  load(id: string, signal: AbortSignal): Promise<Profile>;
};

// #region show
const API_BASE_URL = "https://api.example.com";

async function loadUser(id: string, signal: AbortSignal): Promise<User> {
  const response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(id)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.json();
}
// #endregion
