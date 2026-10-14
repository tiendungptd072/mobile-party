type ProfileState = { kind: "loading" } | { kind: "ready"; profile: Profile };
declare const api: {
  getProfile(id: string): Promise<{ id: string; display_name: string }>;
};

// #region show
function toReadyState(profile: Profile): ProfileState {
  return { kind: "ready", profile };
}

function useProfile(repository: ProfileRepository, id: string) {
  const [state, setState] = useState<ProfileState>({ kind: "loading" });
  useEffect(() => { void repository.getProfile(id).then(toReadyState); }, [id, repository]);
  return state;
}
// #endregion
