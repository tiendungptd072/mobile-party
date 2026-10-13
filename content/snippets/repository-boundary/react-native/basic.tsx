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
