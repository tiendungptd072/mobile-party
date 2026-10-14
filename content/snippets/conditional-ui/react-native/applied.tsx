declare const state:
  { status: "loading" | "empty" } | { status: "ready"; data: Profile };
function VerificationComponent() {
// #region show
switch (state.status) {
  case "loading": return <LoadingView />;
  case "empty": return <EmptyView />;
  case "ready": return <Content data={state.data} />;
}
// #endregion
}
