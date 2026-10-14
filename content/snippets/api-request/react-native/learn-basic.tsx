type User = { id: string; displayName: string };
type UserDto = { id: string; display_name: string };
declare const api: {
  getUser(id: string, signal: AbortSignal): Promise<UserDto>;
};
declare const repository: {
  getUser(id: string, signal: AbortSignal): Promise<User>;
};

// #region show
async function getUser(id: string, signal: AbortSignal): Promise<UserDto> {
  const response = await fetch(API_URL + "/users/" + encodeURIComponent(id), { signal });
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
}
// #endregion
