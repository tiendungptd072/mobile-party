// #region show
async function getUser(id: string, signal: AbortSignal): Promise<UserDto> {
  const response = await fetch(API_URL + "/users/" + encodeURIComponent(id), { signal });
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
}
// #endregion
