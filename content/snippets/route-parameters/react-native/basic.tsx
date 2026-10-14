type Props = { route: { params: { userId: string } } };
declare function useUser(id: string): User;
declare const Profile: import("react").ComponentType<{ user: User }>;
declare function useProfile(id: string): Profile | null;
declare const profileRepository: {
  loadAuthorized(id: string, signal: AbortSignal): Promise<Profile>;
};

// #region show
function ProfileScreen({ route }: Props) {
  const { userId } = route.params;
  const user = useUser(userId);
  return <Profile user={user} />;
}
// #endregion
