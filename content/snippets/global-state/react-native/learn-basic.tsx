type ScreenProps = { state: { name: string }; onRename(name: string): void };
declare const initialState: { name: string };
declare function profileReducer(
  state: { name: string },
  event: { type: "rename"; name: string },
): { name: string };
declare const Profile: import("react").ComponentType<{
  user: User | null;
  onSignOut(): void;
}>;

// #region show
function useProfileScreen() {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return {
    state,
    rename: (name: string) => dispatch({ type: "rename", name }),
  };
}
// #endregion
