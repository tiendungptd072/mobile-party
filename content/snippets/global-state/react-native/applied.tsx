type ScreenProps = { state: { name: string }; onRename(name: string): void };
declare const initialState: { name: string };
declare function profileReducer(
  state: { name: string },
  event: { type: "rename"; name: string },
): { name: string };
declare function useProfileScreen(): {
  state: { name: string };
  rename(name: string): void;
};
declare const Profile: import("react").ComponentType<{
  user: User | null;
  onSignOut(): void;
}>;

// #region show
function ProfileRoute() {
  const model = useProfileScreen();
  return <ProfileScreen state={model.state} onRename={model.rename} />;
}

function ProfileScreen({ state, onRename }: ScreenProps) {
  return <ProfileForm name={state.name} onRename={onRename} />;
}
// #endregion
