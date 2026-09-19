export const repositoryBoundaryConcept = {
  id: "repository-boundary",
  slug: "repository-boundary",
  title: "Repository Boundary",
  description:
    "Keep network, database, and platform sources behind a repository so screen state stays testable and transport-independent.",
  category: "architecture",
  order: 45.25,
  aliases: ["data layer", "data source", "repository pattern"],
  keywords: [
    "repository",
    "network",
    "database",
    "mapping",
    "single source of truth",
  ],
  implementations: {
    "react-native": {
      name: "Inject a repository into a screen hook",
      summary:
        "The hook receives a domain-facing repository, not a fetch client.",
      language: "tsx",
      filename: "use-profile.ts",
      code: `function toReadyState(profile: Profile): ProfileState {
  return { kind: "ready", profile };
}

function useProfile(repository: ProfileRepository, id: string) {
  const [state, setState] = useState<ProfileState>({ kind: "loading" });
  useEffect(() => { void repository.getProfile(id).then(toReadyState); }, [id, repository]);
  return state;
}`,
    },
    kotlin: {
      name: "Inject a repository into a ViewModel",
      summary:
        "The ViewModel depends on domain data, not Retrofit, Room, or Context.",
      language: "kotlin",
      filename: "ProfileViewModel.kt",
      code: `class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel() {
    fun load(id: String) = viewModelScope.launch {
        _uiState.value = ProfileUiState.Ready(repository.getProfile(id))
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both keep UI state owners dependent on an application-facing contract. On Android, repositories are the recommended boundary for data sources such as network, Room, DataStore, and platform providers.",
    },
  ],
  mentalModel:
    "A repository owns how application data is obtained and reconciled; a ViewModel owns how that data becomes screen state. Do not map every API endpoint to a repository method mechanically—design contracts around application data and user operations.",
  differences: [
    "React Native teams may put a query client or API module directly behind a hook; Android architecture explicitly recommends repositories between UI layer types and data sources.",
    "A repository can expose suspend functions for one-shot operations and Flow for changes over time; it is not a UI state store.",
  ],
  commonMistakes: [
    "Injecting Retrofit, a DAO, AsyncStorage, or Android Context directly into a ViewModel or reusable composable.",
    "Creating a repository that merely forwards every call without a data ownership, mapping, caching, or testability decision.",
  ],
  productionNotes: [
    "Map transport and persistence models at a data-layer boundary and expose stable domain models or errors upward.",
    "Use a fake repository in ViewModel tests; reserve real network/database integration tests for the repository implementation.",
  ],
} as const;
