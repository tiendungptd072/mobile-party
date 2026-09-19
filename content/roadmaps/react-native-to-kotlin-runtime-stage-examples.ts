function pair(
  name: string,
  reactNativeCode: string,
  kotlinCode: string,
  filenames: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `React Native perspective on ${name.toLowerCase()}.`,
      language: "tsx",
      filename: filenames[0],
      code: reactNativeCode,
    },
    kotlin: {
      name,
      summary: `Compose perspective on ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      code: kotlinCode,
    },
  } as const;
}

export const composeRuntimeStageExamples = {
  recomposition: {
    basic: pair(
      "UI derived from state",
      `function Counter() {
  const [count, setCount] = useState(0);
  return <Button title={String(count)} onPress={() => setCount((n) => n + 1)} />;
}`,
      `@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    Button(onClick = { count++ }) { Text("$count") }
}`,
      ["Counter.tsx", "Counter.kt"],
    ),
    applied: pair(
      "Read only the state needed",
      `function Cart({ items }: { items: Item[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <TotalLabel total={total} />;
}`,
      `@Composable
fun Cart(items: List<Item>) {
    val total = items.sumOf(Item::price)
    TotalLabel(total)
}`,
      ["Cart.tsx", "Cart.kt"],
    ),
    production: pair(
      "Keep rendering pure",
      `function ProfileRoute({ id }: { id: string }) {
  const profile = useProfile(id);
  return <ProfileScreen profile={profile} />;
}`,
      `@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val profile by viewModel.profile.collectAsStateWithLifecycle()
    ProfileScreen(profile)
}`,
      ["ProfileRoute.tsx", "ProfileRoute.kt"],
    ),
  },
  "snapshot-state": {
    basic: pair(
      "Update an observable count",
      `function Tags() {
  const [tags, setTags] = useState<string[]>([]);
  return <Button title={String(tags.length)} onPress={() =>
    setTags((current) => [...current, "new"])
  } />;
}`,
      `@Composable
fun Tags() {
    val tags = remember { mutableStateListOf<String>() }
    Button(onClick = { tags.add("new") }) { Text(tags.size.toString()) }
}`,
      ["Tags.tsx", "Tags.kt"],
    ),
    applied: pair(
      "Edit a visible collection",
      `function Tags() {
  const [tags, setTags] = useState(["one", "two"]);
  return <View>{tags.map((tag) =>
    <Button key={tag} title={tag} onPress={() =>
      setTags((current) => current.filter((item) => item !== tag))
    } />
  )}</View>;
}`,
      `@Composable
fun Tags() {
    val tags = remember { mutableStateListOf("one", "two") }
    Column {
        tags.forEach { tag ->
            key(tag) { TextButton(onClick = { tags.remove(tag) }) { Text(tag) } }
        }
    }
}`,
      ["Tags.tsx", "Tags.kt"],
    ),
    production: pair(
      "Keep mutation with the owner",
      `function TagScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const add = (tag: string) => setTags((current) => [...current, tag]);
  return <TagEditor tags={tags} onAdd={add} />;
}`,
      `class TagState {
    private val editable = mutableStateListOf<String>()
    val tags: List<String> get() = editable.toList()
    fun add(tag: String) { editable.add(tag) }
}

@Composable
fun TagScreen(state: TagState = remember { TagState() }) {
    TagEditor(tags = state.tags, onAdd = state::add)
}`,
      ["TagScreen.tsx", "TagScreen.kt"],
    ),
  },
  "ui-identity": {
    basic: pair(
      "Stable row identity",
      `<FlatList
  data={posts}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <PostRow post={item} />}
/>`,
      `LazyColumn {
    items(posts, key = { it.id }) { post -> PostRow(post) }
}`,
      ["Feed.tsx", "Feed.kt"],
    ),
    applied: pair(
      "Preserve a row draft when sorting",
      `const sorted = [...posts].sort(byNewest);
<FlatList
  data={sorted}
  keyExtractor={(post) => post.id}
  renderItem={({ item }) => <EditablePost post={item} />}
/>`,
      `val sorted = posts.sortedByDescending(Post::createdAt)
LazyColumn {
    items(sorted, key = { it.id }) { post -> EditablePost(post) }
}`,
      ["SortedFeed.tsx", "SortedFeed.kt"],
    ),
    production: pair(
      "Reset draft when its owner changes",
      `function Editor({ selected }: Props) {
  return <DraftEditor key={selected.id} item={selected} />;
}`,
      `@Composable
fun Editor(selected: Item) {
    key(selected.id) { DraftEditor(selected) }
}`,
      ["Editor.tsx", "Editor.kt"],
    ),
  },
  "state-restoration": {
    basic: pair(
      "Composition-local draft",
      `function SearchDraft() {
  const [query, setQuery] = useState("");
  return <TextInput value={query} onChangeText={setQuery} />;
}`,
      `@Composable
fun SearchDraft() {
    var query by remember { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}`,
      ["SearchDraft.tsx", "SearchDraft.kt"],
    ),
    applied: pair(
      "Explicit restoration boundary",
      `function SearchDraft({ query, onQueryChange }: Props) {
  return <TextInput value={query} onChangeText={onQueryChange} />;
}`,
      `@Composable
fun SearchDraft() {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}`,
      ["SearchDraft.tsx", "SearchDraft.kt"],
    ),
    production: pair(
      "Restore an ID then reload data",
      `function ProfileRoute({ userId }: { userId: string }) {
  const profile = useProfile(userId);
  return <ProfileScreen profile={profile} />;
}`,
      `class ProfileViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ProfileRepository,
) : ViewModel() {
    private val id: String = checkNotNull(savedStateHandle["userId"])
    val profile = repository.observeProfile(id)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), null)
}`,
      ["ProfileRoute.tsx", "ProfileViewModel.kt"],
    ),
  },
  "stability-and-skipping": {
    basic: pair(
      "Avoid unnecessary row work",
      `const UserRow = memo(function UserRow({ name }: { name: string }) {
  return <Text>{name}</Text>;
});`,
      `@Composable
fun UserRow(name: String) {
    Text(name)
}`,
      ["UserRow.tsx", "UserRow.kt"],
    ),
    applied: pair(
      "Pass narrow stable values",
      `<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow name={item.name} />}
/>`,
      `LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(name = user.name)
    }
}`,
      ["Users.tsx", "Users.kt"],
    ),
    production: pair(
      "Keep correctness independent of memoization",
      `function UserRow({ name, onOpen }: Props) {
  return <Pressable onPress={onOpen}><Text>{name}</Text></Pressable>;
}`,
      `@Composable
fun UserRow(name: String, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(name) }
}`,
      ["UserRow.tsx", "UserRow.kt"],
    ),
  },
  "modifier-order": {
    basic: pair(
      "Paint padded surface",
      `<View style={{ backgroundColor: "#dbeafe", padding: 16 }}>
  <Text>Profile</Text>
</View>`,
      `Box(Modifier.background(Color(0xFFDBEAFE)).padding(16.dp)) {
    Text("Profile")
}`,
      ["Card.tsx", "Card.kt"],
    ),
    applied: pair(
      "Keep outer spacing unpainted",
      `<View style={{ padding: 16 }}>
  <View style={{ backgroundColor: "#dbeafe" }}><Text>Profile</Text></View>
</View>`,
      `Box(Modifier.padding(16.dp).background(Color(0xFFDBEAFE))) {
    Text("Profile")
}`,
      ["InsetCard.tsx", "InsetCard.kt"],
    ),
    production: pair(
      "Include padding in touch bounds",
      `<Pressable onPress={onOpen} style={{ padding: 16 }}>
  <Text>Open profile</Text>
</Pressable>`,
      `Box(Modifier.clickable(onClick = onOpen).padding(16.dp)) {
    Text("Open profile")
}`,
      ["OpenProfile.tsx", "OpenProfile.kt"],
    ),
  },
  "composition-local": {
    basic: pair(
      "Provide a spacing token",
      `const SpacingContext = createContext(8);
function Card() {
  const spacing = useContext(SpacingContext);
  return <View style={{ padding: spacing }}><Text>Profile</Text></View>;
}
function Screen() {
  return <SpacingContext.Provider value={16}><Card /></SpacingContext.Provider>;
}`,
      `val LocalSpacing = compositionLocalOf { 8.dp }
@Composable fun Card() {
    Box(Modifier.padding(LocalSpacing.current)) { Text("Profile") }
}
@Composable fun Screen() {
    CompositionLocalProvider(LocalSpacing provides 16.dp) { Card() }
}`,
      ["Spacing.tsx", "Spacing.kt"],
    ),
    applied: pair(
      "Override one branch",
      `<SpacingContext.Provider value={8}>
  <Card />
  <SpacingContext.Provider value={24}><Card /></SpacingContext.Provider>
</SpacingContext.Provider>`,
      `CompositionLocalProvider(LocalSpacing provides 8.dp) {
    Card()
    CompositionLocalProvider(LocalSpacing provides 24.dp) { Card() }
}`,
      ["Spacing.tsx", "Spacing.kt"],
    ),
    production: pair(
      "Keep screen state explicit",
      `function ProfileScreen({ name }: { name: string }) {
  const spacing = useContext(SpacingContext);
  return <View style={{ padding: spacing }}><Text>{name}</Text></View>;
}`,
      `@Composable
fun ProfileScreen(name: String) {
    Box(Modifier.padding(LocalSpacing.current)) { Text(name) }
}`,
      ["ProfileScreen.tsx", "ProfileScreen.kt"],
    ),
  },
} as const;
