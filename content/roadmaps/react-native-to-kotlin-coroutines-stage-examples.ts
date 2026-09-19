export const coroutinesStageExamples = {
  "coroutine-scopes": {
    basic: {
      "react-native": {
        name: "Own a request in an effect",
        summary:
          "Cleanup aborts work and stale results cannot update the screen.",
        language: "tsx",
        filename: "use-user.ts",
        code: `useEffect(() => {
  const controller = new AbortController();
  setHasError(false);
  void repository.loadUser(userId, controller.signal)
    .then((user) => { if (!controller.signal.aborted) setUser(user); })
    .catch(() => { if (!controller.signal.aborted) setHasError(true); });
  return () => controller.abort();
}, [repository, userId]);`,
      },
      kotlin: {
        name: "Own a request in composition",
        summary:
          "LaunchedEffect cancels its child Job when the key or UI lifetime changes.",
        language: "kotlin",
        filename: "UserRoute.kt",
        code: `var user by remember(userId) { mutableStateOf<User?>(null) }
var hasError by remember(userId) { mutableStateOf(false) }
LaunchedEffect(userId) {
    hasError = false
    try {
        user = repository.loadUser(userId)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Cancel a superseded search",
        summary:
          "A new query aborts the previous request and ignores its late result.",
        language: "tsx",
        filename: "use-search.ts",
        code: `useEffect(() => {
  const controller = new AbortController();
  setHasError(false);
  void repository.search(query, controller.signal)
    .then((items) => { if (!controller.signal.aborted) setItems(items); })
    .catch(() => { if (!controller.signal.aborted) setHasError(true); });
  return () => controller.abort();
}, [query, repository]);`,
      },
      kotlin: {
        name: "Cancel work when the query changes",
        summary:
          "The previous LaunchedEffect child is canceled before new keyed work.",
        language: "kotlin",
        filename: "SearchRoute.kt",
        code: `var items by remember(query) { mutableStateOf<List<Item>>(emptyList()) }
var hasError by remember(query) { mutableStateOf(false) }
LaunchedEffect(query) {
    hasError = false
    try {
        items = repository.search(query)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Keep latest request ownership in a hook",
        summary:
          "The hook aborts old work and cleans up when its screen leaves.",
        language: "tsx",
        filename: "use-profile.ts",
        code: `const current = useRef<AbortController | null>(null);
function reload() {
  current.current?.abort();
  const controller = new AbortController();
  current.current = controller;
  void repository.load(controller.signal)
    .then((profile) => {
      if (!controller.signal.aborted) setState({ kind: "ready", profile });
    })
    .catch(() => {
      if (!controller.signal.aborted) setState({ kind: "error" });
    });
}
useEffect(() => () => current.current?.abort(), []);`,
      },
      kotlin: {
        name: "Keep request ownership in a ViewModel",
        summary:
          "A ViewModel Job cancels old work and preserves cancellation semantics.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        code: `private var loadJob: Job? = null

fun reload() {
    loadJob?.cancel()
    loadJob = viewModelScope.launch {
        _state.value = ProfileState.Loading
        try {
            _state.value = ProfileState.Ready(repository.load())
        } catch (cancelled: CancellationException) {
            throw cancelled
        } catch (error: Exception) {
            _state.value = ProfileState.Error
        }
    }
}`,
      },
    },
  },
  "flow-and-stateflow": {
    basic: {
      "react-native": {
        name: "Produce a lazy page sequence",
        summary:
          "Calling the async generator starts a fresh sequence for each consumer.",
        language: "typescript",
        filename: "pages.ts",
        code: `async function* pages() {
  yield await api.loadPage(1);
  yield await api.loadPage(2);
}

async function loadPages() {
  for await (const page of pages()) append(page);
}`,
      },
      kotlin: {
        name: "Collect a cold Flow",
        summary: "The flow block executes anew for each collector.",
        language: "kotlin",
        filename: "Pages.kt",
        code: `fun pages(): Flow<Page> = flow {
    emit(api.loadPage(1))
    emit(api.loadPage(2))
}

suspend fun loadPages() {
    pages().collect { page -> append(page) }
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Read current store state",
        summary:
          "A store supplies an immutable snapshot and unsubscribe contract.",
        language: "tsx",
        filename: "FeedRoute.tsx",
        code: `function FeedRoute() {
  const state = useSyncExternalStore(feedStore.subscribe, feedStore.getSnapshot);
  return <FeedScreen state={state} />;
}`,
      },
      kotlin: {
        name: "Read current StateFlow value",
        summary: "The collection follows the screen LifecycleOwner.",
        language: "kotlin",
        filename: "FeedRoute.kt",
        code: `@Composable
fun FeedRoute(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    FeedScreen(state)
}`,
      },
    },
    production: {
      "react-native": {
        name: "Share one upstream subscription",
        summary:
          "The app store starts on first subscriber and stops on last cleanup.",
        language: "typescript",
        filename: "feed-store.ts",
        code: `function createFeedStore(source: FeedSource) {
  let snapshot: FeedState = { kind: "loading" };
  let stop: (() => void) | undefined;
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!stop) stop = source.subscribe((next) => {
        snapshot = next;
        listeners.forEach((notify) => notify());
      });
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) { stop?.(); stop = undefined; }
      };
    },
  };
}`,
      },
      kotlin: {
        name: "Share one upstream Flow as screen state",
        summary:
          "stateIn owns an initial value and a subscription-aware sharing policy.",
        language: "kotlin",
        filename: "FeedViewModel.kt",
        code: `val uiState: StateFlow<FeedUiState> = repository.posts
    .map<List<Post>, FeedUiState> { posts -> FeedUiState.Ready(posts) }
    .catch { error ->
        if (error is IOException) emit(FeedUiState.Error)
        else throw error
    }
    .stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        FeedUiState.Loading,
    )`,
      },
    },
  },
} as const;
