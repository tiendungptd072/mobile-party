type ProfileState = { kind: "loading" } | { kind: "ready"; profile: Profile };
declare const api: {
  getProfile(id: string): Promise<{ id: string; display_name: string }>;
};

// #region show
type ProfileRepository = { getProfile(id: string): Promise<Profile> };

function useProfile(repository: ProfileRepository, id: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => { void repository.getProfile(id).then(setProfile); }, [id, repository]);
  return profile;
}
// #endregion
