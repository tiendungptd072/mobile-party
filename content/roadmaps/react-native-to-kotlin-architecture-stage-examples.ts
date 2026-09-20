export const architectureStageExamples = {
  "refresh-bookmark-races": {
    basic: {
      "react-native": {
        name: "Separate remote fields from local intent",
        summary:
          "A refresh can replace posts without replacing bookmark choices.",
        language: "tsx",
        filename: "feed-state.ts",
        code: `type Post = { id: string; title: string };
type FeedState = {
  posts: Post[];
  bookmarkedIds: ReadonlySet<string>;
};

const initialFeed: FeedState = {
  posts: [],
  bookmarkedIds: new Set(),
};

const visiblePosts = (state: FeedState) => state.posts.map((post) => ({
  ...post,
  bookmarked: state.bookmarkedIds.has(post.id),
}));`,
      },
      kotlin: {
        name: "Separate remote fields from local intent",
        summary: "Fetched posts and local bookmark IDs remain separate values.",
        language: "kotlin",
        filename: "FeedState.kt",
        code: `data class Post(val id: String, val title: String)
data class FeedState(
    val posts: List<Post> = emptyList(),
    val bookmarkedIds: Set<String> = emptySet(),
)
data class VisiblePost(val post: Post, val bookmarked: Boolean)

fun visiblePosts(state: FeedState) = state.posts.map { post ->
    VisiblePost(post, post.id in state.bookmarkedIds)
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Reduce events from current state",
        summary:
          "The completed refresh changes posts; a bookmark tap changes only local intent.",
        language: "tsx",
        filename: "feed-reducer.ts",
        code: `type FeedEvent =
  | { type: "refreshed"; posts: Post[] }
  | { type: "bookmark-toggled"; id: string };

function reduceFeed(state: FeedState, event: FeedEvent): FeedState {
  if (event.type === "refreshed") return { ...state, posts: event.posts };
  const ids = new Set(state.bookmarkedIds);
  if (ids.has(event.id)) ids.delete(event.id);
  else ids.add(event.id);
  return { ...state, bookmarkedIds: ids };
}

function useFeed() {
  const [feed, setFeed] = useState(initialFeed);
  function dispatch(event: FeedEvent) {
    setFeed((current) => reduceFeed(current, event));
  }
  return { feed, dispatch };
}`,
      },
      kotlin: {
        name: "Reduce events from current state",
        summary:
          "StateFlow.update preserves whichever field the other event last changed.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        code: `sealed interface FeedEvent {
    data class Refreshed(val posts: List<Post>) : FeedEvent
    data class BookmarkToggled(val id: String) : FeedEvent
}

fun reduceFeed(state: FeedState, event: FeedEvent): FeedState = when (event) {
    is FeedEvent.Refreshed -> state.copy(posts = event.posts)
    is FeedEvent.BookmarkToggled -> state.copy(
        bookmarkedIds = if (event.id in state.bookmarkedIds)
            state.bookmarkedIds - event.id else state.bookmarkedIds + event.id,
    )
}

class FeedViewModel : ViewModel() {
    private val feed = MutableStateFlow(FeedState())

    fun dispatch(event: FeedEvent) {
        feed.update { current -> reduceFeed(current, event) }
    }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Finish refresh after the bookmark tap",
        summary:
          "A controlled promise proves a late network response cannot clear local intent.",
        language: "tsx",
        filename: "feed-reducer.test.ts",
        code: `test("bookmark survives either refresh order", async () => {
  let complete!: (posts: Post[]) => void;
  const pending = new Promise<Post[]>((resolve) => { complete = resolve; });
  let state = initialFeed;
  const refresh = pending.then((posts) => {
    state = reduceFeed(state, { type: "refreshed", posts });
  });

  state = reduceFeed(state, { type: "bookmark-toggled", id: "a" });
  complete([{ id: "a", title: "Fresh" }]);
  await refresh;
  expect(state.posts[0].title).toBe("Fresh");
  expect(state.bookmarkedIds.has("a")).toBe(true);

  state = reduceFeed(initialFeed, {
    type: "refreshed", posts: [{ id: "a", title: "Fresh" }],
  });
  state = reduceFeed(state, { type: "bookmark-toggled", id: "a" });
  expect(state.posts[0].title).toBe("Fresh");
  expect(state.bookmarkedIds.has("a")).toBe(true);
});`,
      },
      kotlin: {
        name: "Finish refresh after the bookmark tap",
        summary:
          "A controlled deferred response proves the same event order in a coroutine test.",
        language: "kotlin",
        filename: "FeedReducerTest.kt",
        code: `@Test fun bookmarkSurvivesLateRefresh() = runTest {
    val pending = CompletableDeferred<List<Post>>()
    var state = FeedState()
    val refresh = launch(start = CoroutineStart.UNDISPATCHED) {
        state = reduceFeed(state, FeedEvent.Refreshed(pending.await()))
    }
    state = reduceFeed(state, FeedEvent.BookmarkToggled("a"))
    pending.complete(listOf(Post("a", "Fresh")))
    refresh.join()
    assertEquals("Fresh", state.posts.single().title)
    assertTrue("a" in state.bookmarkedIds)

    val refreshed = reduceFeed(FeedState(), FeedEvent.Refreshed(state.posts))
    val tappedAfter = reduceFeed(refreshed, FeedEvent.BookmarkToggled("a"))
    assertEquals("Fresh", tappedAfter.posts.single().title)
    assertTrue("a" in tappedAfter.bookmarkedIds)
}`,
      },
    },
  },
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
  "feature-module-boundaries": {
    basic: {
      "react-native": {
        name: "Publish a package contract",
        summary: "The feature and data packages share only a narrow API.",
        language: "tsx",
        filename: "packages/profile-contract/src/index.ts",
        code: `export type Profile = { id: string; name: string };
export interface ProfileReader {
  load(id: string): Promise<Profile>;
}`,
      },
      kotlin: {
        name: "Publish an API module contract",
        summary: "The feature and data modules share one interface.",
        language: "kotlin",
        filename: "core/profile-api/src/main/kotlin/ProfileReader.kt",
        code: `data class Profile(val id: String, val name: String)
interface ProfileReader {
    suspend fun load(id: String): Profile
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Depend on the package contract",
        summary:
          "The feature accepts a reader without importing the HTTP implementation.",
        language: "tsx",
        filename: "packages/profile-feature/src/ProfileRoute.tsx",
        code: `import type { ProfileReader } from "@app/profile-contract";

export function ProfileRoute({ reader }: { reader: ProfileReader }) {
  return <ProfileScreen reader={reader} />;
}`,
      },
      kotlin: {
        name: "Depend on the API module",
        summary: "The feature ViewModel accepts a contract, not a Room DAO.",
        language: "kotlin",
        filename: "feature/profile/src/main/kotlin/ProfileViewModel.kt",
        code: `class ProfileViewModel(
    private val reader: ProfileReader,
) : ViewModel()`,
      },
    },
    production: {
      "react-native": {
        name: "Assemble packages at the app root",
        summary:
          "The app chooses the concrete reader; the feature stays independent.",
        language: "tsx",
        filename: "apps/mobile/ProfileEntry.tsx",
        code: `import { ProfileRoute } from "@app/profile-feature";
import { HttpProfileReader } from "@app/profile-data";

const reader = new HttpProfileReader(apiClient);
export function ProfileEntry() {
  return <ProfileRoute reader={reader} />;
}`,
      },
      kotlin: {
        name: "Assemble modules at the app boundary",
        summary:
          "The app supplies the data implementation to the feature ViewModel.",
        language: "kotlin",
        filename: "app/src/main/kotlin/ProfileEntry.kt",
        code: `class ProfileEntry(private val database: AppDatabase) {
    fun createViewModel(): ProfileViewModel {
        val reader: ProfileReader = RoomProfileReader(database.profileDao())
        return ProfileViewModel(reader)
    }
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
