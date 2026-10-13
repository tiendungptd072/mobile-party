// #region show
const API_BASE_URL = "https://api.example.com";

function createAuthenticatedGet(
  initialToken: string,
  refreshAccessToken: () => Promise<string>,
  onSignOut: () => void,
) {
  let accessToken: string | null = initialToken;
  let refreshPromise: Promise<string | null> | null = null;

  return async function authenticatedGet(path: string): Promise<Response> {
    const sentToken = accessToken;
    if (sentToken === null) throw new Error("Signed out");
    const send = (token: string) => fetch(API_BASE_URL + path, {
      headers: { Authorization: "Bearer " + token },
    });
    const response = await send(sentToken);
    if (response.status !== 401) return response;

    if (accessToken === sentToken) {
      refreshPromise ??= Promise.resolve()
        .then(refreshAccessToken)
        .then((token) => {
          if (!token.trim() || token === sentToken) throw new Error("Invalid refreshed token");
          accessToken = token;
          return token;
        })
        .catch(() => {
          accessToken = null;
          onSignOut();
          return null;
        })
        .finally(() => { refreshPromise = null; });
      await refreshPromise;
    }

    const nextToken = accessToken;
    return nextToken === null ? response : send(nextToken);
  };
}
// #endregion
