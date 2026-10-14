type Props = { state: ProfileState; retry(): void };
declare const repository: { load(signal: AbortSignal): Promise<Profile> };
declare const state: { status: "error" | "ready" };
declare function load(): void;
function VerificationComponent() {
// #region show
if (state.status === "error") {
  return <ErrorView message="Could not load profile" onRetry={load} />;
}
// #endregion
}
