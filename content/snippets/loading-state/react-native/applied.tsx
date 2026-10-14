declare const state:
  { status: "loading" | "empty" } | { status: "ready"; items: Profile[] };
function VerificationComponent() {
// #region show
switch (state.status) {
  case "loading": return <LoadingView />;
  case "empty": return <EmptyView />;
  case "ready": return <ProfileList profiles={state.items} />;
}
// #endregion
}
