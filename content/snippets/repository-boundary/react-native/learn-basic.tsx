// #region show
type ProfileRepository = { getProfile(id: string): Promise<Profile> };

function useProfile(repository: ProfileRepository, id: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => { void repository.getProfile(id).then(setProfile); }, [id, repository]);
  return profile;
}
// #endregion
