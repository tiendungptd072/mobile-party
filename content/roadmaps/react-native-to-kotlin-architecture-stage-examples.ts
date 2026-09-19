export const architectureStageExamples = {
  "repository-boundary": {
    basic: {
      "react-native": {
        name: "Hide the HTTP client",
        summary: "The hook asks for profile data through a narrow contract.",
        language: "tsx",
        filename: "use-profile.ts",
        code: `type ProfileRepository = { getProfile(id: string): Promise<Profile> };

function useProfile(repository: ProfileRepository, id: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => { void repository.getProfile(id).then(setProfile); }, [id, repository]);
  return profile;
}`,
      },
      kotlin: {
        name: "Hide the data source",
        summary: "The ViewModel requests domain data through a repository.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        code: `interface ProfileRepository {
    suspend fun getProfile(id: String): Profile
}

class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()`,
      },
    },
    applied: {
      "react-native": {
        name: "Map a DTO once",
        summary:
          "The repository prevents API field names from leaking into UI state.",
        language: "typescript",
        filename: "profile-repository.ts",
        code: `class HttpProfileRepository implements ProfileRepository {
  async getProfile(id: string): Promise<Profile> {
    const dto = await api.getProfile(id);
    return { id: dto.id, name: dto.display_name };
  }
}`,
      },
      kotlin: {
        name: "Map a DTO once",
        summary:
          "The repository converts network data before returning it upward.",
        language: "kotlin",
        filename: "OfflineFirstProfileRepository.kt",
        code: `class OfflineFirstProfileRepository(
    private val api: ProfileApi,
) : ProfileRepository {
    override suspend fun getProfile(id: String): Profile {
        return api.getProfile(id).toDomain()
    }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Test a state owner with a fake",
        summary: "The fake is deterministic and does not need network mocking.",
        language: "typescript",
        filename: "fake-profile-repository.ts",
        code: `class FakeProfileRepository implements ProfileRepository {
  constructor(private readonly result: Profile) {}
  getProfile(): Promise<Profile> { return Promise.resolve(this.result); }
}`,
      },
      kotlin: {
        name: "Test a ViewModel with a fake",
        summary: "The fake makes data-layer behavior controlled and explicit.",
        language: "kotlin",
        filename: "FakeProfileRepository.kt",
        code: `class FakeProfileRepository(
    private val result: Profile,
) : ProfileRepository {
    override suspend fun getProfile(id: String): Profile = result
}`,
      },
    },
  },
  "dependency-injection": {
    basic: {
      "react-native": {
        name: "Wire a dependency at the route",
        summary:
          "The route receives a repository instead of constructing it in a leaf.",
        language: "tsx",
        filename: "ProfileRoute.tsx",
        code: `function AppRoot() {
  const repository = new HttpProfileRepository(apiClient);
  return <ProfileRoute repository={repository} />;
}`,
      },
      kotlin: {
        name: "Use constructor injection",
        summary: "The ViewModel declares the dependency it needs.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        code: `class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()`,
      },
    },
    applied: {
      "react-native": {
        name: "Replace a dependency in a test",
        summary:
          "The route can receive a fake contract without module mocking.",
        language: "tsx",
        filename: "ProfileRoute.test.tsx",
        code: `render(
  <ProfileRoute repository={new FakeProfileRepository(profile)} />,
);`,
      },
      kotlin: {
        name: "Provide a Hilt binding",
        summary:
          "Hilt constructs the repository implementation for injected consumers.",
        language: "kotlin",
        filename: "RepositoryModule.kt",
        code: `@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    abstract fun bindProfileRepository(
        implementation: OfflineFirstProfileRepository,
    ): ProfileRepository
}`,
      },
    },
    production: {
      "react-native": {
        name: "Keep scopes explicit",
        summary:
          "One app client is shared; screen-specific state stays in the route.",
        language: "tsx",
        filename: "AppDependencies.ts",
        code: `export function createAppDependencies() {
  const client = new ApiClient();
  return { profileRepository: new HttpProfileRepository(client) };
}`,
      },
      kotlin: {
        name: "Inject a Hilt ViewModel",
        summary: "Hilt creates a screen ViewModel with its constructor graph.",
        language: "kotlin",
        filename: "ProfileRoute.kt",
        code: `@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val repository: ProfileRepository,
) : ViewModel()

@Composable
fun ProfileRoute(viewModel: ProfileViewModel = hiltViewModel()) { /* render */ }`,
      },
    },
  },
} as const;
