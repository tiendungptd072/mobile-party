type Props = { state: ProfileState; retry(): void };
declare const repository: { load(signal: AbortSignal): Promise<Profile> };

// #region show
type ProfileState =
  | { status: "ready"; profile: Profile }
  | { status: "error"; message: string };

function ProfileScreen({ state, retry }: Props) {
  if (state.status === "error") {
    return <ErrorPanel message={state.message} onRetry={retry} />;
  }

  return <ProfileCard profile={state.profile} />;
}
// #endregion
