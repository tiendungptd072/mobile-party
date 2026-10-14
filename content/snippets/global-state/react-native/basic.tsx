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
function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);
  return <Profile user={user} onSignOut={signOut} />;
}
// #endregion
