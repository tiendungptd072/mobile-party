declare function setState(
  state:
    | { status: "loading" }
    | { status: "success"; profile: unknown }
    | { status: "error"; message: string },
): void;
// #region show
const API_BASE_URL = "https://api.example.com";

async function loadProfile(signal: AbortSignal) {
  if (signal.aborted) return;
  setState({ status: "loading" });
  try {
    const response = await fetch(API_BASE_URL + "/profile", { signal });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const profile = await response.json();
    if (!signal.aborted) setState({ status: "success", profile });
  } catch {
    if (!signal.aborted) {
      setState({ status: "error", message: "Could not load profile" });
    }
  }
}
// #endregion
