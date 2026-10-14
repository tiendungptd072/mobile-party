type Props = { route: { params: { userId: string } } };
declare function useUser(id: string): User;
declare const Profile: import("react").ComponentType<{ user: User }>;
declare function useProfile(id: string): Profile | null;
declare const ProfileScreen: import("react").ComponentType<{
  profile: Profile | null;
}>;
declare const profileRepository: {
  loadAuthorized(id: string, signal: AbortSignal): Promise<Profile>;
};

// #region show
type RootStackParams = {
  Profile: { userId: string };
};

navigation.navigate("Profile", { userId: user.id });
// #endregion
