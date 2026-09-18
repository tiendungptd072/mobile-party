function pair(
  name: string,
  reactNativeCode: string,
  kotlinCode: string,
  filenames: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `React Native implementation for ${name.toLowerCase()}.`,
      language: "tsx",
      filename: filenames[0],
      code: reactNativeCode,
    },
    kotlin: {
      name,
      summary: `Jetpack Compose implementation for ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      code: kotlinCode,
    },
  } as const;
}

export const progressiveStageExamples = {
  component: {
    basic: pair(
      "Render a UI function",
      `function Greeting() {
  return <Text>Hello</Text>;
}`,
      `@Composable
fun Greeting() {
    Text("Hello")
}`,
      ["Greeting.tsx", "Greeting.kt"],
    ),
    applied: pair(
      "State and event contract",
      `function ProfileCard({ profile, onOpen }: Props) {
  return <Pressable onPress={onOpen}><Text>{profile.name}</Text></Pressable>;
}`,
      `@Composable
fun ProfileCard(profile: Profile, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(profile.name) }
}`,
      ["ProfileCard.tsx", "ProfileCard.kt"],
    ),
    production: pair(
      "Route and content split",
      `function ProfileRoute() {
  const model = useProfile();
  return <ProfileScreen state={model.state} onRetry={model.retry} />;
}`,
      `@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ProfileScreen(state, onRetry = viewModel::retry)
}`,
      ["ProfileRoute.tsx", "ProfileRoute.kt"],
    ),
  },
  props: {
    basic: pair(
      "Immutable input",
      `function UserName({ name }: { name: string }) {
  return <Text>{name}</Text>;
}`,
      `@Composable
fun UserName(name: String) {
    Text(name)
}`,
      ["UserName.tsx", "UserName.kt"],
    ),
    applied: pair(
      "Values down, events up",
      `function UserRow({ user, onSelect }: Props) {
  return <Pressable onPress={() => onSelect(user.id)}><Text>{user.name}</Text></Pressable>;
}`,
      `@Composable
fun UserRow(user: User, onSelect: (String) -> Unit) {
    TextButton(onClick = { onSelect(user.id) }) { Text(user.name) }
}`,
      ["UserRow.tsx", "UserRow.kt"],
    ),
    production: pair(
      "Focused UI contract",
      `type ProfileHeaderProps = {
  displayName: string;
  avatarUrl?: string;
  onEdit: () => void;
};`,
      `@Composable
fun ProfileHeader(
    displayName: String,
    avatarUrl: String?,
    onEdit: () -> Unit,
)`,
      ["ProfileHeader.tsx", "ProfileHeader.kt"],
    ),
  },
  children: {
    basic: pair(
      "Single content slot",
      `function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}`,
      `@Composable
fun Card(content: @Composable () -> Unit) {
    Surface(shape = MaterialTheme.shapes.medium, content = content)
}`,
      ["Card.tsx", "Card.kt"],
    ),
    applied: pair(
      "Named slots",
      `function Panel({ header, children, actions }: Props) {
  return <View>{header}<View>{children}</View>{actions}</View>;
}`,
      `@Composable
fun Panel(
    header: @Composable () -> Unit,
    content: @Composable () -> Unit,
    actions: @Composable () -> Unit,
)`,
      ["Panel.tsx", "Panel.kt"],
    ),
    production: pair(
      "Scoped slot API",
      `function List({ data, renderItem }: Props) {
  return <FlatList data={data} renderItem={renderItem} />;
}`,
      `@Composable
fun AppScaffold(content: @Composable PaddingValues.() -> Unit) {
    Scaffold { padding -> padding.content() }
}`,
      ["List.tsx", "AppScaffold.kt"],
    ),
  },
  "conditional-ui": {
    basic: pair(
      "Two UI branches",
      `return isLoading ? <ActivityIndicator /> : <ProfileCard profile={profile} />;`,
      `if (isLoading) CircularProgressIndicator() else ProfileCard(profile)`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
    applied: pair(
      "Exhaustive screen state",
      `switch (state.status) {
  case "loading": return <LoadingView />;
  case "empty": return <EmptyView />;
  case "ready": return <Content data={state.data} />;
}`,
      `when (state) {
    UiState.Loading -> LoadingView()
    UiState.Empty -> EmptyView()
    is UiState.Ready -> Content(state.data)
}`,
      ["Screen.tsx", "Screen.kt"],
    ),
    production: pair(
      "Stable state machine",
      `type UiState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; retryable: boolean }
  | { status: "ready"; data: Profile };`,
      `sealed interface UiState {
    data object Loading : UiState
    data object Empty : UiState
    data class Error(val retryable: Boolean) : UiState
    data class Ready(val data: Profile) : UiState
}`,
      ["ui-state.ts", "UiState.kt"],
    ),
  },
  layout: {
    basic: pair(
      "Row and column",
      `<View style={styles.row}>
  <Avatar />
  <View><Text>Name</Text><Text>Role</Text></View>
</View>`,
      `Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Column { Text("Name"); Text("Role") }
}`,
      ["ProfileHeader.tsx", "ProfileHeader.kt"],
    ),
    applied: pair(
      "Flexible child sizing",
      `<View style={styles.row}>
  <Avatar />
  <Text style={{ flex: 1 }}>{name}</Text>
  <IconButton name="more" />
</View>`,
      `Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Text(name, Modifier.weight(1f))
    IconButton(onClick = onMore) { MoreIcon() }
}`,
      ["ProfileRow.tsx", "ProfileRow.kt"],
    ),
    production: pair(
      "Reusable spacing tokens",
      `const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.md, borderRadius: radius.md },
});`,
      `@Composable
fun ProfileCard(content: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.padding(AppSpacing.large), verticalArrangement = Arrangement.spacedBy(AppSpacing.medium), content = content)
}`,
      ["profile-styles.ts", "ProfileCard.kt"],
    ),
  },
  "vertical-layout": {
    basic: pair(
      "Vertical arrangement",
      `<View style={{ gap: 8 }}><Text>Title</Text><Text>Subtitle</Text></View>`,
      `Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Text("Title")
    Text("Subtitle")
}`,
      ["Summary.tsx", "Summary.kt"],
    ),
    applied: pair(
      "Aligned profile summary",
      `<View style={{ alignItems: "center", gap: 12 }}>
  <Avatar />
  <Text>{name}</Text>
</View>`,
      `Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
    Avatar()
    Text(name)
}`,
      ["ProfileSummary.tsx", "ProfileSummary.kt"],
    ),
    production: pair(
      "Bounded scrolling content",
      `<ScrollView contentContainerStyle={styles.content}>
  <ProfileHeader />
  <ProfileDetails />
</ScrollView>`,
      `Column(Modifier.verticalScroll(rememberScrollState()).padding(16.dp)) {
    ProfileHeader()
    ProfileDetails()
}`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
  },
  "horizontal-layout": {
    basic: pair(
      "Horizontal arrangement",
      `<View style={{ flexDirection: "row", gap: 8 }}><Icon /><Text>Label</Text></View>`,
      `Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Icon()
    Text("Label")
}`,
      ["LabelRow.tsx", "LabelRow.kt"],
    ),
    applied: pair(
      "Flexible center content",
      `<View style={styles.row}>
  <Avatar />
  <Text style={{ flex: 1 }}>{name}</Text>
  <MoreButton />
</View>`,
      `Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Text(name, Modifier.weight(1f))
    MoreButton()
}`,
      ["UserRow.tsx", "UserRow.kt"],
    ),
    production: pair(
      "Constrained action row",
      `<View style={styles.row}>
  <Text numberOfLines={2} style={{ flex: 1 }}>{title}</Text>
  <Button title="Open" onPress={onOpen} />
</View>`,
      `Row(verticalAlignment = Alignment.CenterVertically) {
    Text(title, Modifier.weight(1f), maxLines = 2, overflow = TextOverflow.Ellipsis)
    Button(onClick = onOpen) { Text("Open") }
}`,
      ["ActionRow.tsx", "ActionRow.kt"],
    ),
  },
  stack: {
    basic: pair(
      "Layer two children",
      `<View><Image source={photo} /><Text style={styles.overlay}>New</Text></View>`,
      `Box {
    Image(painter, contentDescription = null)
    Text("New", Modifier.align(Alignment.TopEnd))
}`,
      ["PhotoBadge.tsx", "PhotoBadge.kt"],
    ),
    applied: pair(
      "Anchored avatar badge",
      `<View style={styles.avatarContainer}>
  <Avatar />
  <OnlineBadge style={styles.bottomEnd} />
</View>`,
      `Box {
    Avatar()
    OnlineBadge(Modifier.align(Alignment.BottomEnd))
}`,
      ["AvatarBadge.tsx", "AvatarBadge.kt"],
    ),
    production: pair(
      "Accessible overlay action",
      `<View style={styles.media}>
  <Image source={photo} accessibilityLabel={description} />
  <Pressable accessibilityRole="button" accessibilityLabel="Play video" style={styles.center}><PlayIcon /></Pressable>
</View>`,
      `Box {
    Image(painter, contentDescription = description)
    IconButton(onClick = onPlay, modifier = Modifier.align(Alignment.Center)) {
        Icon(Icons.Default.PlayArrow, contentDescription = "Play video")
    }
}`,
      ["VideoCard.tsx", "VideoCard.kt"],
    ),
  },
  list: {
    basic: pair(
      "Lazy list",
      `<FlatList data={users} renderItem={({ item }) => <UserRow user={item} />} />`,
      `LazyColumn {
    items(users) { user -> UserRow(user) }
}`,
      ["UserList.tsx", "UserList.kt"],
    ),
    applied: pair(
      "Stable item identity",
      `<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow user={item} onPress={() => onSelect(item.id)} />}
/>`,
      `LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(user, onClick = { onSelect(user.id) })
    }
}`,
      ["UserList.tsx", "UserList.kt"],
    ),
    production: pair(
      "Complete collection states",
      `return items.length === 0
  ? <EmptyView onRetry={reload} />
  : <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} />;`,
      `if (items.isEmpty()) EmptyView(onRetry)
else LazyColumn { items(items, key = { it.id }) { item -> ItemRow(item) } }`,
      ["FeedScreen.tsx", "FeedScreen.kt"],
    ),
  },
  grid: {
    basic: pair(
      "Fixed grid",
      `<FlatList data={photos} numColumns={2} renderItem={({ item }) => <PhotoTile photo={item} />} />`,
      `LazyVerticalGrid(columns = GridCells.Fixed(2)) {
    items(photos) { photo -> PhotoTile(photo) }
}`,
      ["PhotoGrid.tsx", "PhotoGrid.kt"],
    ),
    applied: pair(
      "Stable adaptive grid",
      `<FlatList
  data={photos}
  numColumns={columns}
  keyExtractor={(photo) => photo.id}
  renderItem={({ item }) => <PhotoTile photo={item} />}
/>`,
      `LazyVerticalGrid(columns = GridCells.Adaptive(160.dp)) {
    items(photos, key = { it.id }) { photo -> PhotoTile(photo) }
}`,
      ["PhotoGrid.tsx", "PhotoGrid.kt"],
    ),
    production: pair(
      "Sized image cells",
      `function PhotoTile({ photo }: Props) {
  return <Image source={{ uri: photo.url }} style={{ flex: 1, aspectRatio: 1 }} resizeMode="cover" />;
}`,
      `@Composable
fun PhotoTile(photo: Photo) {
    AsyncImage(model = photo.url, contentDescription = photo.description, modifier = Modifier.aspectRatio(1f), contentScale = ContentScale.Crop)
}`,
      ["PhotoTile.tsx", "PhotoTile.kt"],
    ),
  },
  async: {
    basic: pair(
      "Await one operation",
      `async function loadUser(id: string) {
  const user = await repository.getUser(id);
  setUser(user);
}`,
      `suspend fun loadUser(id: String): User {
    return repository.getUser(id)
}`,
      ["load-user.ts", "UserRepository.kt"],
    ),
    applied: pair(
      "Cancel superseded work",
      `useEffect(() => {
  const controller = new AbortController();
  loadUser(userId, controller.signal).then(setUser);
  return () => controller.abort();
}, [userId]);`,
      `LaunchedEffect(userId) {
    user = repository.getUser(userId)
}
// A changed key cancels the previous coroutine.`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
    production: pair(
      "Owned asynchronous state",
      `function useProfile(id: string) {
  const [state, setState] = useState<ProfileState>({ status: "loading" });
  useEffect(() => repository.load(id).then(
    (profile) => setState({ status: "ready", profile }),
    () => setState({ status: "error" }),
  ), [id]);
  return state;
}`,
      `class ProfileViewModel(private val repository: ProfileRepository) : ViewModel() {
    val state = repository.observeProfile()
        .map<Profile, ProfileUiState> { Ready(it) }
        .catch { emit(Error) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
}`,
      ["use-profile.ts", "ProfileViewModel.kt"],
    ),
  },
  "loading-state": {
    basic: pair(
      "Explicit loading branch",
      `if (state.status === "loading") return <ActivityIndicator />;
return <ProfileView profile={state.profile} />;`,
      `when (state) {
    ProfileUiState.Loading -> CircularProgressIndicator()
    is ProfileUiState.Ready -> ProfileView(state.profile)
}`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
    applied: pair(
      "Loading, empty, and content",
      `switch (state.status) {
  case "loading": return <LoadingView />;
  case "empty": return <EmptyView />;
  case "ready": return <ProfileList profiles={state.items} />;
}`,
      `when (state) {
    ProfilesUiState.Loading -> LoadingView()
    ProfilesUiState.Empty -> EmptyView()
    is ProfilesUiState.Ready -> ProfileList(state.items)
}`,
      ["ProfilesScreen.tsx", "ProfilesScreen.kt"],
    ),
    production: pair(
      "Refresh while preserving content",
      `type FeedState = {
  items: Post[];
  isRefreshing: boolean;
};

<FlatList data={state.items} refreshing={state.isRefreshing} onRefresh={refresh} />`,
      `data class FeedUiState(
    val items: List<Post> = emptyList(),
    val isRefreshing: Boolean = false,
)

PullToRefreshBox(isRefreshing = state.isRefreshing, onRefresh = onRefresh) {
    FeedList(state.items)
}`,
      ["FeedScreen.tsx", "FeedScreen.kt"],
    ),
  },
  "error-handling": {
    basic: pair(
      "Recoverable error",
      `if (state.status === "error") {
  return <ErrorView message="Could not load profile" onRetry={load} />;
}`,
      `if (state is ProfileUiState.Error) {
    ErrorView(message = "Could not load profile", onRetry = onRetry)
}`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
    applied: pair(
      "Map technical failures",
      `function toProfileError(error: unknown): ProfileError {
  if (error instanceof OfflineError) return { type: "offline" };
  if (error instanceof NotFoundError) return { type: "notFound" };
  return { type: "unknown" };
}`,
      `fun Throwable.toProfileError(): ProfileError = when (this) {
    is UnknownHostException -> ProfileError.Offline
    is ProfileNotFoundException -> ProfileError.NotFound
    else -> ProfileError.Unknown
}`,
      ["profile-error.ts", "ProfileError.kt"],
    ),
    production: pair(
      "Retry without swallowing cancellation",
      `async function load(signal: AbortSignal) {
  try { return await repository.load(signal); }
  catch (error) {
    if (signal.aborted) throw error;
    return { status: "error", retry: () => reload() };
  }
}`,
      `suspend fun load(): ProfileUiState = try {
    ProfileUiState.Ready(repository.load())
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Throwable) {
    ProfileUiState.Error(error.toProfileError())
}`,
      ["load-profile.ts", "ProfileRepository.kt"],
    ),
  },
  "api-request": {
    basic: pair(
      "Typed GET request",
      `async function getUser(id: string): Promise<UserDto> {
  const response = await fetch(API_URL + "/users/" + id);
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
}`,
      `interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): UserDto
}`,
      ["user-api.ts", "UserApi.kt"],
    ),
    applied: pair(
      "Repository mapping",
      `class UserRepository {
  async getUser(id: string): Promise<User> {
    const dto = await api.getUser(id);
    return { id: dto.id, displayName: dto.display_name };
  }
}`,
      `class UserRepository(private val api: UserApi) {
    suspend fun getUser(id: String): User {
        return api.getUser(id).toDomain()
    }
}`,
      ["user-repository.ts", "UserRepository.kt"],
    ),
    production: pair(
      "Result boundary",
      `async function loadUser(id: string): Promise<Result<User, UserError>> {
  try { return { ok: true, value: await repository.getUser(id) }; }
  catch (error) { return { ok: false, error: mapUserError(error) }; }
}`,
      `suspend fun loadUser(id: String): UserResult = try {
    UserResult.Success(repository.getUser(id))
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Throwable) {
    UserResult.Failure(error.toUserError())
}`,
      ["load-user.ts", "LoadUser.kt"],
    ),
  },
  pagination: {
    basic: pair(
      "Load the next page",
      `async function loadMore() {
  if (isLoading || !nextCursor) return;
  const page = await repository.getPage(nextCursor);
  setItems((current) => [...current, ...page.items]);
  setNextCursor(page.nextCursor);
}`,
      `suspend fun loadMore() {
    if (state.value.isAppending || state.value.nextCursor == null) return
    val page = repository.getPage(state.value.nextCursor)
    _state.update { it.append(page) }
}`,
      ["use-feed.ts", "FeedViewModel.kt"],
    ),
    applied: pair(
      "Separate append state",
      `type FeedState = {
  items: Post[];
  nextCursor?: string;
  append: "idle" | "loading" | "error";
};

<FlatList data={state.items} ListFooterComponent={<AppendState value={state.append} />} />`,
      `data class FeedUiState(
    val items: List<Post> = emptyList(),
    val nextCursor: String? = null,
    val append: AppendState = AppendState.Idle,
)

LazyColumn { items(state.items, key = { it.id }) { PostRow(it) } }`,
      ["FeedScreen.tsx", "FeedScreen.kt"],
    ),
    production: pair(
      "Paging library integration",
      `const query = useInfiniteQuery({
  queryKey: ["feed"],
  queryFn: ({ pageParam }) => api.getFeed(pageParam),
  getNextPageParam: (page) => page.nextCursor,
});

const posts = query.data?.pages.flatMap((page) => page.items) ?? [];`,
      `val posts = Pager(PagingConfig(pageSize = 20)) {
    FeedPagingSource(api)
}.flow.cachedIn(viewModelScope)

val items = viewModel.posts.collectAsLazyPagingItems()
LazyColumn { items(items.itemCount) { index -> items[index]?.let { PostRow(it) } } }`,
      ["use-feed.ts", "FeedScreen.kt"],
    ),
  },
  "local-storage": {
    basic: pair(
      "Persist one preference",
      `await AsyncStorage.setItem("theme", theme);
const theme = await AsyncStorage.getItem("theme");`,
      `suspend fun saveTheme(theme: String) {
    dataStore.edit { it[themeKey] = theme }
}
val theme = dataStore.data.map { it[themeKey] }`,
      ["theme-storage.ts", "ThemePreferences.kt"],
    ),
    applied: pair(
      "Typed storage adapter",
      `async function readTheme(): Promise<Theme> {
  const value = await AsyncStorage.getItem("theme");
  return value === "light" || value === "dark" ? value : "system";
}`,
      `val theme: Flow<Theme> = dataStore.data.map { preferences ->
    Theme.fromStoredValue(preferences[themeKey]) ?: Theme.System
}`,
      ["theme-storage.ts", "ThemePreferences.kt"],
    ),
    production: pair(
      "Versioned persisted data",
      `type StoredSettings = { version: 2; theme: Theme };

async function readSettings(): Promise<StoredSettings> {
  const raw = await AsyncStorage.getItem("settings");
  return migrateSettings(raw ? JSON.parse(raw) : undefined);
}`,
      `@Serializable data class StoredSettings(val version: Int = 2, val theme: Theme = Theme.System)

val settings = dataStore.data
    .catch { error -> if (error is IOException) emit(emptyPreferences()) else throw error }
    .map(::migrateSettings)`,
      ["settings-storage.ts", "SettingsRepository.kt"],
    ),
  },
  "secure-storage": {
    basic: pair(
      "Credential store boundary",
      `interface CredentialStore {
  saveRefreshToken(token: string): Promise<void>;
  readRefreshToken(): Promise<string | null>;
  clear(): Promise<void>;
}`,
      `interface CredentialStore {
    suspend fun saveRefreshToken(token: String)
    suspend fun readRefreshToken(): String?
    suspend fun clear()
}`,
      ["credential-store.ts", "CredentialStore.kt"],
    ),
    applied: pair(
      "Platform-backed credential storage",
      `await Keychain.setGenericPassword("session", token, {
  service: "com.example.session",
});`,
      `val encrypted = cipher.encrypt(token, keyStore.getOrCreateKey())
storage.write("refresh-token", encrypted)`,
      ["keychain-store.ts", "KeystoreCredentialStore.kt"],
    ),
    production: pair(
      "Atomic session cleanup",
      `await sessionMutex.runExclusive(async () => {
  await credentialStore.clear();
  sessionStore.setState({ status: "signedOut" });
});`,
      `sessionMutex.withLock {
    credentialStore.clear()
    sessionState.value = SessionState.SignedOut
}`,
      ["sign-out.ts", "SessionRepository.kt"],
    ),
  },
  authentication: {
    basic: pair(
      "Root session gate",
      `function AppGate() {
  const session = useSession();
  if (session.status === "restoring") return <SplashScreen />;
  return session.status === "signedIn" ? <AppNavigator /> : <AuthNavigator />;
}`,
      `@Composable
fun AppGate(state: SessionState) = when (state) {
    SessionState.Restoring -> SplashScreen()
    SessionState.SignedOut -> AuthNavGraph()
    is SessionState.SignedIn -> AppNavGraph()
}`,
      ["AppGate.tsx", "AppGate.kt"],
    ),
    applied: pair(
      "Restore a session",
      `async function restoreSession() {
  const token = await credentialStore.readRefreshToken();
  if (!token) return setSession({ status: "signedOut" });
  const user = await auth.refresh(token);
  setSession({ status: "signedIn", user });
}`,
      `suspend fun restoreSession() {
    val token = credentialStore.readRefreshToken()
        ?: return sessionState.emit(SessionState.SignedOut)
    val user = auth.refresh(token)
    sessionState.emit(SessionState.SignedIn(user))
}`,
      ["session.ts", "SessionRepository.kt"],
    ),
    production: pair(
      "Single-flight token refresh",
      `async function refreshOnce() {
  if (!refreshPromise) {
    refreshPromise = auth.refresh().finally(() => { refreshPromise = undefined; });
  }
  return refreshPromise;
}`,
      `suspend fun refreshOnce(): Token = refreshMutex.withLock {
    tokenStore.currentValidToken() ?: auth.refresh().also(tokenStore::save)
}`,
      ["token-refresh.ts", "TokenRepository.kt"],
    ),
  },
  theme: {
    basic: pair(
      "Apply a theme",
      `<ThemeContext.Provider value={lightTheme}>
  <AppNavigator />
</ThemeContext.Provider>`,
      `MaterialTheme(colorScheme = lightColorScheme()) {
    AppNavigation()
}`,
      ["AppTheme.tsx", "AppTheme.kt"],
    ),
    applied: pair(
      "System and user preference",
      `const system = useColorScheme();
const resolved = preference === "system" ? system ?? "light" : preference;`,
      `val useDarkColors = when (preference) {
    ThemePreference.System -> isSystemInDarkTheme()
    ThemePreference.Dark -> true
    ThemePreference.Light -> false
}`,
      ["use-theme.ts", "AppTheme.kt"],
    ),
    production: pair(
      "Semantic design tokens",
      `const darkTheme = {
  background: "#101114",
  surface: "#191B20",
  onSurface: "#F2F3F5",
  accent: "#8EABFF",
};`,
      `private val DarkColors = darkColorScheme(
    background = Color(0xFF101114),
    surface = Color(0xFF191B20),
    onSurface = Color(0xFFF2F3F5),
    primary = Color(0xFF8EABFF),
)`,
      ["theme.ts", "Color.kt"],
    ),
  },
} as const;
