export const reactNativeToKotlinRoadmap = {
  source: "react-native",
  target: "kotlin",
  sections: [
    {
      id: "ui-basics",
      title: "UI Basics",
      order: 10,
      lessons: [
        {
          conceptSlug: "component",
          title: "Component",
          order: 10,
          exercise: "Rewrite a React Native profile card as a composable.",
          checklist: ["Can describe inputs", "Can emit events"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render a small component with explicit inputs.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Split visual state from user events.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep composables reusable by passing state and callbacks.",
            },
          ],
        },
        {
          conceptSlug: "props",
          title: "Props and Parameters",
          order: 11,
          exercise:
            "Convert a typed React Native card with value and callback props into a stateless composable.",
          checklist: [
            "Passes immutable state down",
            "Emits user events through callbacks",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Map a props object to named Kotlin parameters and function types.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Keep a reusable composable stateless by receiving its displayed value and event callbacks.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Expose a focused UI contract instead of passing screen dependencies or a ViewModel through the tree.",
            },
          ],
        },
        {
          conceptSlug: "children",
          title: "Children and Content Slots",
          order: 12,
          exercise:
            "Rewrite a React Native panel that accepts children as a Compose container with a content slot.",
          checklist: [
            "Can map children to a content lambda",
            "Uses named slots when a container has several insertion points",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Accept and invoke one @Composable content lambda.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Create separate header, content, and action slots with clear responsibilities.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use scoped slots only when callers need structured capabilities, not as a default abstraction.",
            },
          ],
        },
        {
          conceptSlug: "conditional-ui",
          title: "Conditional UI",
          order: 15,
          exercise:
            "Build a profile screen that shows loading, content, and empty states without leaving stale UI behind.",
          checklist: [
            "Can explain that each UI branch is a description of current state.",
            "Models loading, content, and empty states explicitly.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Choose between two composables with an if expression, just as you choose JSX with a conditional expression.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Render a complete loading, content, or empty branch from one screen state instead of toggling individual views.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use a sealed UI-state model so success, error, loading, and empty states remain exhaustive as the feature grows.",
            },
          ],
        },
        {
          conceptSlug: "layout",
          title: "Layout",
          order: 20,
          exercise:
            "Recreate a React Native profile header with an avatar, title, and action using Row, Column, and Modifier.",
          checklist: [
            "Can map row and column intent to Compose layout composables.",
            "Can explain why Modifier order changes the result.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Place two children in a Row or Column and use alignment and spacing deliberately.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Translate common flexbox layouts while moving child-specific constraints into each child Modifier.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Extract repeated spacing and alignment into focused composables or design tokens rather than copying modifier chains.",
            },
          ],
        },
        {
          conceptSlug: "list",
          title: "List",
          order: 30,
          exercise: "Convert a FlatList row into a LazyColumn item.",
          checklist: ["Uses stable keys", "Handles loading state"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render a small collection.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Handle item interaction and empty state.",
            },
            {
              id: "production",
              title: "Production",
              description: "Use stable identity and pagination boundaries.",
            },
          ],
        },
        {
          conceptSlug: "vertical-layout",
          title: "Vertical Layout",
          order: 21,
          exercise:
            "Convert a vertically stacked React Native profile summary into a Column.",
          checklist: [
            "Maps the main and cross axes",
            "Avoids unnecessary fill constraints",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Arrange children vertically with Column.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Control spacing, alignment, and child sizing deliberately.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Choose Column, scrolling, or LazyColumn from the content bounds.",
            },
          ],
        },
        {
          conceptSlug: "horizontal-layout",
          title: "Horizontal Layout",
          order: 22,
          exercise:
            "Convert a flexible React Native toolbar into a Row with one weighted child.",
          checklist: [
            "Uses weight only in the correct scope",
            "Tests narrow widths and long text",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Arrange children horizontally with Row.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Translate flex growth into scoped weight and alignment.",
            },
            {
              id: "production",
              title: "Production",
              description: "Handle RTL, font scale, and constrained width.",
            },
          ],
        },
        {
          conceptSlug: "stack",
          title: "Stack and Overlay",
          order: 23,
          exercise:
            "Place an online badge over an avatar without fixed screen coordinates.",
          checklist: [
            "Uses Box for genuine overlap",
            "Keeps overlay semantics accessible",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Layer two children in a Box.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Anchor an overlay with Modifier.align.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Support variable size, clipping, and accessibility.",
            },
          ],
        },
        {
          conceptSlug: "grid",
          title: "Grid",
          order: 31,
          exercise:
            "Convert a two-column FlatList into an adaptive LazyVerticalGrid.",
          checklist: [
            "Uses stable item keys",
            "Chooses fixed or adaptive columns intentionally",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render a fixed-column lazy grid.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Adapt cell count to available width.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Handle image size, empty state, and large collections.",
            },
          ],
        },
      ],
    },
    {
      id: "state",
      title: "State",
      order: 20,
      lessons: [
        {
          conceptSlug: "text-input",
          title: "Text Input",
          order: 5,
          exercise:
            "Convert a controlled React Native name field into a state-hoisted Compose TextField with validation owned by its parent.",
          checklist: [
            "Can trace value down and edit events up.",
            "Can identify why a field becomes read-only when state is not updated.",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Render a TextField with a value and onValueChange callback, matching the controlled input mental model.",
              examples: {
                "react-native": {
                  name: "Controlled TextInput",
                  summary: "The rendered value always comes from React state.",
                  language: "tsx",
                  filename: "NameField.tsx",
                  code: `function NameField() {
  const [name, setName] = useState("");
  return <TextInput value={name} onChangeText={setName} />;
}`,
                },
                kotlin: {
                  name: "Controlled TextField",
                  summary:
                    "The rendered value comes from observable Compose state.",
                  language: "kotlin",
                  filename: "NameField.kt",
                  code: `@Composable
fun NameField() {
    var name by rememberSaveable { mutableStateOf("") }
    TextField(value = name, onValueChange = { name = it })
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Hoist the field value so a parent can coordinate validation, labels, and submission.",
              examples: {
                "react-native": {
                  name: "Reusable controlled field",
                  summary:
                    "The field receives a value and emits text changes to its owner.",
                  language: "tsx",
                  filename: "EmailField.tsx",
                  code: `function EmailField({ value, onChange }: Props) {
  return <TextInput
    value={value}
    onChangeText={onChange}
    autoCapitalize="none"
    keyboardType="email-address"
  />;
}`,
                },
                kotlin: {
                  name: "State-hoisted field",
                  summary:
                    "The composable receives immutable text and emits edit events.",
                  language: "kotlin",
                  filename: "EmailField.kt",
                  code: `@Composable
fun EmailField(value: String, onValueChange: (String) -> Unit) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
    )
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep reusable fields presentation-focused while form validation and submit state live in the screen state owner.",
              examples: {
                "react-native": {
                  name: "Field presentation contract",
                  summary:
                    "Validation state is supplied without coupling the field to form logic.",
                  language: "tsx",
                  filename: "EmailField.tsx",
                  code: `function EmailField({ value, error, onChange }: Props) {
  return <View>
    <TextInput value={value} onChangeText={onChange} accessibilityLabel="Email" />
    {error ? <Text accessibilityLiveRegion="polite">{error}</Text> : null}
  </View>;
}`,
                },
                kotlin: {
                  name: "Field presentation contract",
                  summary:
                    "The reusable field renders external validation and remains state-free.",
                  language: "kotlin",
                  filename: "EmailField.kt",
                  code: `@Composable
fun EmailField(value: String, error: String?, onValueChange: (String) -> Unit) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        isError = error != null,
        supportingText = { error?.let { Text(it) } },
        label = { Text("Email") },
    )
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "local-state",
          title: "Local State",
          order: 10,
          exercise: "Move a counter from useState to remember state.",
          checklist: ["Explains recomposition", "Knows when to hoist state"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Update local UI state.",
              examples: {
                "react-native": {
                  name: "useState counter",
                  summary:
                    "The component owns a small value used only by its UI.",
                  language: "tsx",
                  filename: "Counter.tsx",
                  code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button title={\`Count: \${count}\`} onPress={() => setCount(count + 1)} />
  );
}`,
                },
                kotlin: {
                  name: "remember counter",
                  summary:
                    "The composition retains observable state across recompositions.",
                  language: "kotlin",
                  filename: "Counter.kt",
                  code: `@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description: "Hoist state for a reusable child.",
              examples: {
                "react-native": {
                  name: "Controlled counter",
                  summary:
                    "The parent owns state while the child exposes an event callback.",
                  language: "tsx",
                  filename: "Counter.tsx",
                  code: `function Counter({ count, onIncrement }: Props) {
  return <Button title={\`Count: \${count}\`} onPress={onIncrement} />;
}

function CounterScreen() {
  const [count, setCount] = useState(0);
  return <Counter count={count} onIncrement={() => setCount((n) => n + 1)} />;
}`,
                },
                kotlin: {
                  name: "State-hoisted counter",
                  summary:
                    "The reusable composable receives immutable state and emits intent.",
                  language: "kotlin",
                  filename: "Counter.kt",
                  code: `@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Button(onClick = onIncrement) { Text("Count: $count") }
}

@Composable
fun CounterScreen() {
    var count by rememberSaveable { mutableIntStateOf(0) }
    Counter(count, onIncrement = { count++ })
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Choose ViewModel or saveable state when lifetime changes.",
              examples: {
                "react-native": {
                  name: "Screen state hook",
                  summary:
                    "A screen-level hook owns state and exposes intent methods.",
                  language: "tsx",
                  filename: "counter-screen.tsx",
                  code: `function useCounterScreen() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount((value) => value + 1) };
}

function CounterScreen() {
  const state = useCounterScreen();
  return <Counter count={state.count} onIncrement={state.increment} />;
}`,
                },
                kotlin: {
                  name: "ViewModel and StateFlow",
                  summary:
                    "A lifecycle-scoped state holder exposes immutable screen state.",
                  language: "kotlin",
                  filename: "CounterScreen.kt",
                  code: `class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count = _count.asStateFlow()

    fun increment() = _count.update { it + 1 }
}

@Composable
fun CounterRoute(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsStateWithLifecycle()
    Counter(count, onIncrement = viewModel::increment)
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "derived-state",
          title: "Derived State",
          order: 20,
          exercise:
            "Remove duplicated total state from a cart and derive it from the current item list.",
          checklist: [
            "Keeps one source of truth",
            "Knows when memoization is unnecessary",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Calculate a cheap value directly from current parameters.",
              examples: {
                "react-native": {
                  name: "Inline derivation",
                  summary:
                    "A cheap total is recalculated from the current source data.",
                  language: "tsx",
                  filename: "CartSummary.tsx",
                  code: `function CartSummary({ items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <Text>Total: {total}</Text>;
}`,
                },
                kotlin: {
                  name: "Inline derivation",
                  summary:
                    "A cheap value is calculated directly during composition.",
                  language: "kotlin",
                  filename: "CartSummary.kt",
                  code: `@Composable
fun CartSummary(items: List<CartItem>) {
    val total = items.sumOf { it.price }
    Text("Total: $total")
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Remove synchronized mutable state and derive filtered or aggregated UI data.",
              examples: {
                "react-native": {
                  name: "Derived filtered list",
                  summary:
                    "Filtered results come from props and query without another state variable.",
                  language: "tsx",
                  filename: "ProductList.tsx",
                  code: `function ProductList({ products, query }: Props) {
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return <FlatList data={visibleProducts} renderItem={renderProduct} />;
}`,
                },
                kotlin: {
                  name: "Derived filtered list",
                  summary:
                    "The composable calculates visible items from its current inputs.",
                  language: "kotlin",
                  filename: "ProductList.kt",
                  code: `@Composable
fun ProductList(products: List<Product>, query: String) {
    val visibleProducts = products.filter {
        it.name.contains(query, ignoreCase = true)
    }
    LazyColumn { items(visibleProducts, key = { it.id }) { ProductRow(it) } }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Use derivedStateOf only when state changes more often than the UI result and profiling supports it.",
              examples: {
                "react-native": {
                  name: "Threshold state",
                  summary:
                    "The scroll handler updates React state only when the threshold result changes.",
                  language: "tsx",
                  filename: "Feed.tsx",
                  code: `function Feed({ posts }: Props) {
  const [showTop, setShowTop] = useState(false);

  return <FlatList
    data={posts}
    onScroll={({ nativeEvent }) => {
      const next = nativeEvent.contentOffset.y > 200;
      setShowTop((current) => current === next ? current : next);
    }}
  />;
}`,
                },
                kotlin: {
                  name: "derivedStateOf threshold",
                  summary:
                    "The observed result changes only when the visible-item threshold changes.",
                  language: "kotlin",
                  filename: "Feed.kt",
                  code: `@Composable
fun Feed(posts: List<Post>) {
    val listState = rememberLazyListState()
    val showTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 0 }
    }

    LazyColumn(state = listState) {
        items(posts, key = { it.id }) { PostRow(it) }
    }
    AnimatedVisibility(showTop) { ScrollToTopButton() }
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "global-state",
          title: "Screen and Shared State",
          order: 30,
          exercise:
            "Move a profile screen from an external React store to ViewModel-owned immutable UI state.",
          checklist: [
            "Chooses the lowest suitable state owner",
            "Collects StateFlow with lifecycle awareness",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Expose immutable screen state and intent methods from a ViewModel.",
              examples: {
                "react-native": {
                  name: "Screen state hook",
                  summary:
                    "A focused hook owns screen state and exposes intent methods.",
                  language: "tsx",
                  filename: "use-profile-screen.ts",
                  code: `function useProfileScreen() {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return {
    state,
    rename: (name: string) => dispatch({ type: "rename", name }),
  };
}`,
                },
                kotlin: {
                  name: "ViewModel state holder",
                  summary:
                    "A ViewModel exposes immutable StateFlow and intent methods.",
                  language: "kotlin",
                  filename: "ProfileViewModel.kt",
                  code: `class ProfileViewModel : ViewModel() {
    private val _state = MutableStateFlow(ProfileUiState())
    val state = _state.asStateFlow()

    fun rename(name: String) {
        _state.update { it.copy(name = name) }
    }
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Collect state in a route composable and pass plain values and callbacks to screen content.",
              examples: {
                "react-native": {
                  name: "Route and screen boundary",
                  summary:
                    "The route owns the state hook; presentational content receives values and events.",
                  language: "tsx",
                  filename: "ProfileRoute.tsx",
                  code: `function ProfileRoute() {
  const model = useProfileScreen();
  return <ProfileScreen state={model.state} onRename={model.rename} />;
}

function ProfileScreen({ state, onRename }: ScreenProps) {
  return <ProfileForm name={state.name} onRename={onRename} />;
}`,
                },
                kotlin: {
                  name: "Route and screen boundary",
                  summary:
                    "The route collects lifecycle-aware state and passes plain UI contracts.",
                  language: "kotlin",
                  filename: "ProfileRoute.kt",
                  code: `@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ProfileScreen(state = state, onRename = viewModel::rename)
}

@Composable
fun ProfileScreen(state: ProfileUiState, onRename: (String) -> Unit) {
    ProfileForm(name = state.name, onRename = onRename)
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Scope each state holder to the correct destination or navigation graph and preserve only necessary state.",
              examples: {
                "react-native": {
                  name: "Feature-scoped provider",
                  summary:
                    "Checkout state exists only while the checkout navigator is mounted.",
                  language: "tsx",
                  filename: "CheckoutNavigator.tsx",
                  code: `function CheckoutNavigator() {
  return (
    <CheckoutProvider>
      <Stack.Navigator>
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </CheckoutProvider>
  );
}`,
                },
                kotlin: {
                  name: "Graph-scoped ViewModel",
                  summary:
                    "Destinations resolve one ViewModel from their parent navigation graph.",
                  language: "kotlin",
                  filename: "CheckoutGraph.kt",
                  code: `navigation(startDestination = "cart", route = "checkout") {
    composable("cart") { entry ->
        val parent = remember(entry) {
            navController.getBackStackEntry("checkout")
        }
        val viewModel: CheckoutViewModel = viewModel(viewModelStoreOwner = parent)
        CartRoute(viewModel)
    }
}`,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: "lifecycle",
      title: "Lifecycle",
      order: 30,
      lessons: [
        {
          conceptSlug: "side-effects",
          title: "Side Effects",
          order: 10,
          exercise:
            "Classify three React effects as composition work, disposable registration, or ViewModel work before translating them.",
          checklist: [
            "Selects an effect API by ownership",
            "Uses effect keys deliberately",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Run a suspend UI task with LaunchedEffect and a meaningful key.",
              examples: {
                "react-native": {
                  name: "Keyed debounce effect",
                  summary:
                    "Changing the query clears the previous timer before scheduling another search.",
                  language: "tsx",
                  filename: "SearchScreen.tsx",
                  code: `useEffect(() => {
  if (!query) return;
  const timer = setTimeout(() => onSearch(query), 300);
  return () => clearTimeout(timer);
}, [query, onSearch]);`,
                },
                kotlin: {
                  name: "Keyed LaunchedEffect",
                  summary:
                    "Changing the key cancels the previous coroutine before starting a new search.",
                  language: "kotlin",
                  filename: "SearchScreen.kt",
                  code: `LaunchedEffect(query) {
    if (query.isBlank()) return@LaunchedEffect
    delay(300)
    onSearch(query)
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Distinguish LaunchedEffect, DisposableEffect, and work that belongs outside composition.",
              examples: {
                "react-native": {
                  name: "Subscription cleanup",
                  summary:
                    "The effect removes exactly the listener it registered.",
                  language: "tsx",
                  filename: "use-app-state.ts",
                  code: `useEffect(() => {
  const subscription = AppState.addEventListener("change", onChange);
  return () => subscription.remove();
}, [onChange]);`,
                },
                kotlin: {
                  name: "DisposableEffect cleanup",
                  summary:
                    "The observer belongs to the current LifecycleOwner and is removed on disposal.",
                  language: "kotlin",
                  filename: "AppStateObserver.kt",
                  code: `val owner = LocalLifecycleOwner.current

DisposableEffect(owner) {
    val observer = LifecycleEventObserver { _, event -> onEvent(event) }
    owner.lifecycle.addObserver(observer)
    onDispose { owner.lifecycle.removeObserver(observer) }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep effect APIs UI-focused and make cancellation, restart behavior, and ownership explicit.",
              examples: {
                "react-native": {
                  name: "Long-lived effect with latest callback",
                  summary:
                    "A ref supplies the latest callback without restarting the timer.",
                  language: "tsx",
                  filename: "SplashScreen.tsx",
                  code: `const latestOnTimeout = useRef(onTimeout);
useEffect(() => {
  latestOnTimeout.current = onTimeout;
}, [onTimeout]);

useEffect(() => {
  const timer = setTimeout(() => latestOnTimeout.current(), 2_000);
  return () => clearTimeout(timer);
}, []);`,
                },
                kotlin: {
                  name: "rememberUpdatedState",
                  summary:
                    "The effect keeps its lifetime while invoking the latest callback value.",
                  language: "kotlin",
                  filename: "SplashScreen.kt",
                  code: `val currentOnTimeout by rememberUpdatedState(onTimeout)

LaunchedEffect(Unit) {
    delay(2_000)
    currentOnTimeout()
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "lifecycle",
          title: "Lifecycle and Cleanup",
          order: 20,
          exercise:
            "Translate a React subscription with cleanup into a DisposableEffect that registers and removes one observer.",
          checklist: [
            "Removes every manually registered observer",
            "Does not confuse recomposition with lifecycle entry",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Register a listener and remove it from onDispose.",
              examples: {
                "react-native": {
                  name: "Effect cleanup",
                  summary:
                    "The listener is removed whenever the component unmounts.",
                  language: "tsx",
                  filename: "use-connectivity.ts",
                  code: `useEffect(() => {
  const unsubscribe = connectivity.subscribe(setIsOnline);
  return unsubscribe;
}, []);`,
                },
                kotlin: {
                  name: "DisposableEffect cleanup",
                  summary:
                    "The listener is removed when the composable leaves composition.",
                  language: "kotlin",
                  filename: "ConnectivityStatus.kt",
                  code: `DisposableEffect(connectivity) {
    val listener = ConnectivityListener(onStatusChanged)
    connectivity.addListener(listener)
    onDispose { connectivity.removeListener(listener) }
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Restart registration only when the resource owner or another true key changes.",
              examples: {
                "react-native": {
                  name: "Keyed resource subscription",
                  summary:
                    "Changing the room ID cleans up the old subscription before joining the new room.",
                  language: "tsx",
                  filename: "use-room.ts",
                  code: `useEffect(() => {
  const connection = chat.connect(roomId);
  connection.start();
  return () => connection.stop();
}, [chat, roomId]);`,
                },
                kotlin: {
                  name: "Keyed resource subscription",
                  summary:
                    "DisposableEffect restarts only when the connection owner or room changes.",
                  language: "kotlin",
                  filename: "RoomConnection.kt",
                  code: `DisposableEffect(chat, roomId) {
    val connection = chat.connect(roomId).also { it.start() }
    onDispose { connection.stop() }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Prefer lifecycle-aware adapters for observable state and reserve manual disposal for external listener APIs.",
              examples: {
                "react-native": {
                  name: "Store subscription hook",
                  summary:
                    "A React hook owns the store subscription and provides the current snapshot.",
                  language: "tsx",
                  filename: "use-session.ts",
                  code: `function useSession() {
  return useSyncExternalStore(
    sessionStore.subscribe,
    sessionStore.getSnapshot,
    sessionStore.getSnapshot,
  );
}`,
                },
                kotlin: {
                  name: "Lifecycle-aware Flow collection",
                  summary:
                    "The lifecycle adapter starts and stops collection with the visible UI.",
                  language: "kotlin",
                  filename: "SessionRoute.kt",
                  code: `@Composable
fun SessionRoute(viewModel: SessionViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    SessionScreen(state)
}`,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      order: 25,
      lessons: [
        {
          conceptSlug: "button",
          title: "Button and Press Events",
          order: 5,
          exercise:
            "Convert a saving Pressable into a Button with explicit enabled state.",
          checklist: [
            "Emits intent through a callback",
            "Prevents duplicate non-idempotent actions",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Handle one button action.",
              examples: {
                "react-native": {
                  name: "Press action",
                  summary:
                    "The button emits one user intent through a callback.",
                  language: "tsx",
                  filename: "SaveButton.tsx",
                  code: `function SaveButton({ onSave }: Props) {
  return <Button title="Save" onPress={onSave} />;
}`,
                },
                kotlin: {
                  name: "Click action",
                  summary:
                    "The composable emits one user intent through onClick.",
                  language: "kotlin",
                  filename: "SaveButton.kt",
                  code: `@Composable
fun SaveButton(onSave: () -> Unit) {
    Button(onClick = onSave) { Text("Save") }
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description: "Render enabled, disabled, and loading states.",
              examples: {
                "react-native": {
                  name: "Submitting state",
                  summary:
                    "The action is disabled and its label changes while work is running.",
                  language: "tsx",
                  filename: "SaveButton.tsx",
                  code: `function SaveButton({ isSaving, canSave, onSave }: Props) {
  return <Button
    title={isSaving ? "Saving…" : "Save"}
    disabled={isSaving || !canSave}
    onPress={onSave}
  />;
}`,
                },
                kotlin: {
                  name: "Submitting state",
                  summary:
                    "Enabled state and visible feedback are derived from screen state.",
                  language: "kotlin",
                  filename: "SaveButton.kt",
                  code: `@Composable
fun SaveButton(isSaving: Boolean, canSave: Boolean, onSave: () -> Unit) {
    Button(onClick = onSave, enabled = canSave && !isSaving) {
        Text(if (isSaving) "Saving…" else "Save")
    }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Meet semantics, touch-target, and idempotency requirements.",
              examples: {
                "react-native": {
                  name: "Guarded screen action",
                  summary:
                    "The screen owner prevents duplicate saves; the button remains presentation-only.",
                  language: "tsx",
                  filename: "ProfileScreen.tsx",
                  code: `async function handleSave() {
  if (isSaving) return;
  setIsSaving(true);
  try { await saveProfile(); }
  finally { setIsSaving(false); }
}

<SaveButton isSaving={isSaving} onSave={handleSave} />`,
                },
                kotlin: {
                  name: "Guarded intent",
                  summary:
                    "The state owner rejects duplicate intent while the Material button supplies semantics.",
                  language: "kotlin",
                  filename: "ProfileViewModel.kt",
                  code: `fun save() {
    if (state.value.isSaving) return
    viewModelScope.launch {
        _state.update { it.copy(isSaving = true) }
        try { repository.save() }
        finally { _state.update { it.copy(isSaving = false) } }
    }
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "form",
          title: "Form State and Validation",
          order: 10,
          exercise:
            "Build a sign-in form with a controlled email field, derived validation, and an explicit submit state.",
          checklist: [
            "Keeps field state separate from server state",
            "Derives validation instead of synchronizing it",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Own a field value and derive a simple validation result.",
              examples: {
                "react-native": {
                  name: "Local validated field",
                  summary:
                    "Validity is derived from the current email instead of stored separately.",
                  language: "tsx",
                  filename: "SignInForm.tsx",
                  code: `function SignInForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return <>
    <TextInput value={email} onChangeText={setEmail} />
    <Button title="Continue" disabled={!isValid} onPress={() => onSubmit(email)} />
  </>;
}`,
                },
                kotlin: {
                  name: "Local validated field",
                  summary:
                    "Validity is calculated from saveable field state during composition.",
                  language: "kotlin",
                  filename: "SignInForm.kt",
                  code: `@Composable
fun SignInForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = "@" in email

    EmailField(email, onValueChange = { email = it })
    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Hoist values so a parent coordinates multiple fields and submit events.",
              examples: {
                "react-native": {
                  name: "Hoisted form contract",
                  summary:
                    "The form receives values and emits field and submit events.",
                  language: "tsx",
                  filename: "SignInForm.tsx",
                  code: `function SignInForm({ state, onEmailChange, onPasswordChange, onSubmit }: Props) {
  return <>
    <EmailField value={state.email} onChange={onEmailChange} />
    <PasswordField value={state.password} onChange={onPasswordChange} />
    <Button title="Sign in" disabled={!state.canSubmit} onPress={onSubmit} />
  </>;
}`,
                },
                kotlin: {
                  name: "Hoisted form contract",
                  summary:
                    "The composable renders form state and emits typed events.",
                  language: "kotlin",
                  filename: "SignInForm.kt",
                  code: `@Composable
fun SignInForm(state: SignInUiState, onEvent: (SignInEvent) -> Unit) {
    EmailField(state.email) { onEvent(SignInEvent.EmailChanged(it)) }
    PasswordField(state.password) { onEvent(SignInEvent.PasswordChanged(it)) }
    Button(onClick = { onEvent(SignInEvent.Submit) }, enabled = state.canSubmit) {
        Text("Sign in")
    }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Model submitting, error, correction, and success without coupling reusable fields to a ViewModel.",
              examples: {
                "react-native": {
                  name: "Submission state machine",
                  summary:
                    "The screen owner models pending and server-error states around one submit action.",
                  language: "tsx",
                  filename: "use-sign-in.ts",
                  code: `async function submit() {
  if (!state.canSubmit || state.status === "submitting") return;
  dispatch({ type: "submitStarted" });
  try {
    await auth.signIn(state.email, state.password);
    dispatch({ type: "submitSucceeded" });
  } catch {
    dispatch({ type: "submitFailed", message: "Unable to sign in" });
  }
}`,
                },
                kotlin: {
                  name: "ViewModel submission state",
                  summary:
                    "The ViewModel owns asynchronous submission while fields stay reusable.",
                  language: "kotlin",
                  filename: "SignInViewModel.kt",
                  code: `fun submit() {
    val current = state.value
    if (!current.canSubmit || current.isSubmitting) return
    viewModelScope.launch {
        _state.update { it.copy(isSubmitting = true, serverError = null) }
        runCatching { auth.signIn(current.email, current.password) }
            .onFailure { _state.update { state -> state.copy(serverError = "Unable to sign in") } }
        _state.update { it.copy(isSubmitting = false) }
    }
}`,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: "navigation",
      title: "Navigation",
      order: 35,
      lessons: [
        {
          conceptSlug: "navigation",
          title: "Navigation",
          order: 10,
          exercise:
            "Move a profile navigation action out of a presentational screen and into a route-level callback.",
          checklist: [
            "Keeps NavController at the route boundary",
            "Can explain back stack ownership",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Navigate from one destination to another through the graph.",
              examples: {
                "react-native": {
                  name: "Navigate by route name",
                  summary:
                    "The navigation object pushes a destination onto the active stack.",
                  language: "tsx",
                  filename: "HomeScreen.tsx",
                  code: `<Button title="Open profile" onPress={() => navigation.navigate("Profile")} />`,
                },
                kotlin: {
                  name: "Navigate with NavController",
                  summary:
                    "NavController moves to a destination declared in the graph.",
                  language: "kotlin",
                  filename: "HomeScreen.kt",
                  code: `Button(onClick = { navController.navigate("profile") }) {
    Text("Open profile")
}`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Pass navigation callbacks into screen content instead of the controller.",
              examples: {
                "react-native": {
                  name: "Route boundary callback",
                  summary:
                    "Only the route component knows about the navigation object.",
                  language: "tsx",
                  filename: "ProfileRoute.tsx",
                  code: `function ProfileRoute({ navigation }: Props) {
  return <ProfileScreen onEdit={() => navigation.navigate("EditProfile")} />;
}

function ProfileScreen({ onEdit }: ScreenProps) {
  return <Button title="Edit" onPress={onEdit} />;
}`,
                },
                kotlin: {
                  name: "Route boundary callback",
                  summary:
                    "The route owns NavController and content receives a plain event.",
                  language: "kotlin",
                  filename: "ProfileRoute.kt",
                  code: `@Composable
fun ProfileRoute(navController: NavController) {
    ProfileScreen(onEdit = { navController.navigate("edit-profile") })
}

@Composable
fun ProfileScreen(onEdit: () -> Unit) {
    Button(onClick = onEdit) { Text("Edit") }
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Organize graphs by scope and test navigation behavior separately from destination UI.",
              examples: {
                "react-native": {
                  name: "Feature navigator",
                  summary:
                    "A feature owns its stack while screens expose navigation intent.",
                  language: "tsx",
                  filename: "ProfileNavigator.tsx",
                  code: `function ProfileNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileRoute} />
    <Stack.Screen name="EditProfile" component={EditProfileRoute} />
  </Stack.Navigator>;
}`,
                },
                kotlin: {
                  name: "Feature graph",
                  summary:
                    "A graph builder owns destinations and wires route-level callbacks.",
                  language: "kotlin",
                  filename: "ProfileGraph.kt",
                  code: `fun NavGraphBuilder.profileGraph(navController: NavController) {
    navigation(startDestination = "profile", route = "profile-graph") {
        composable("profile") {
            ProfileRoute(onEdit = { navController.navigate("edit-profile") })
        }
        composable("edit-profile") { EditProfileRoute() }
    }
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "route-parameters",
          title: "Route Parameters",
          order: 20,
          exercise:
            "Replace a full user object navigation param with a user ID and load the current profile at the destination.",
          checklist: [
            "Passes only serializable route data",
            "Validates destination arguments",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Pass a compact identifier through a route.",
              examples: {
                "react-native": {
                  name: "Typed route parameter",
                  summary: "Navigation carries only the profile identifier.",
                  language: "tsx",
                  filename: "routes.tsx",
                  code: `type RootStackParams = {
  Profile: { userId: string };
};

navigation.navigate("Profile", { userId: user.id });`,
                },
                kotlin: {
                  name: "Type-safe route",
                  summary:
                    "A serializable destination carries only the profile identifier.",
                  language: "kotlin",
                  filename: "Routes.kt",
                  code: `@Serializable
data class ProfileRoute(val userId: String)

navController.navigate(ProfileRoute(user.id))`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Decode the identifier at the route boundary and pass it into screen content.",
              examples: {
                "react-native": {
                  name: "Route parameter boundary",
                  summary:
                    "The route reads params and supplies a plain identifier to screen state.",
                  language: "tsx",
                  filename: "ProfileRoute.tsx",
                  code: `function ProfileRoute({ route }: Props) {
  const { userId } = route.params;
  const profile = useProfile(userId);
  return <ProfileScreen profile={profile} />;
}`,
                },
                kotlin: {
                  name: "Destination boundary",
                  summary:
                    "The destination decodes its typed route before loading screen data.",
                  language: "kotlin",
                  filename: "ProfileGraph.kt",
                  code: `composable<ProfileRoute> { entry ->
    val route = entry.toRoute<ProfileRoute>()
    ProfileRoute(userId = route.userId)
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Keep route schemas stable and resolve authorized, current data outside the navigation payload.",
              examples: {
                "react-native": {
                  name: "ID-backed screen state",
                  summary:
                    "The state owner resolves current authorized data from the repository.",
                  language: "tsx",
                  filename: "use-profile.ts",
                  code: `function useProfile(userId: string) {
  const [state, setState] = useState<ProfileState>({ status: "loading" });
  useEffect(() => profileRepository.loadAuthorized(userId).then(
    (profile) => setState({ status: "ready", profile }),
    () => setState({ status: "unavailable" }),
  ), [userId]);
  return state;
}`,
                },
                kotlin: {
                  name: "Saved route ID",
                  summary:
                    "SavedStateHandle supplies the ID; the repository remains the source of current data.",
                  language: "kotlin",
                  filename: "ProfileViewModel.kt",
                  code: `class ProfileViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ProfileRepository,
) : ViewModel() {
    private val route = savedStateHandle.toRoute<ProfileRoute>()
    val state = repository.observeAuthorized(route.userId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
}`,
                },
              },
            },
          ],
        },
        {
          conceptSlug: "deep-link",
          title: "Deep Links",
          order: 30,
          exercise:
            "Configure a profile URL pattern and reject an invalid profile identifier before loading data.",
          checklist: [
            "Treats the URL as untrusted input",
            "Keeps link patterns aligned with routes",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Map one URL pattern to a destination.",
              examples: {
                "react-native": {
                  name: "Linking configuration",
                  summary:
                    "A URL pattern maps to the Profile screen and its userId parameter.",
                  language: "typescript",
                  filename: "linking.ts",
                  code: `export const linking = {
  prefixes: ["https://example.com"],
  config: { screens: { Profile: "users/:userId" } },
};`,
                },
                kotlin: {
                  name: "Navigation deep link",
                  summary:
                    "The destination declares the external URI pattern it accepts.",
                  language: "kotlin",
                  filename: "ProfileGraph.kt",
                  code: `composable<ProfileRoute>(
    deepLinks = listOf(
        navDeepLink { uriPattern = "https://example.com/users/{userId}" },
    ),
) { entry -> ProfileRoute(entry.toRoute<ProfileRoute>().userId) }`,
                },
              },
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Parse and validate route data before rendering the destination.",
              examples: {
                "react-native": {
                  name: "Validated link parameter",
                  summary:
                    "The route rejects malformed external identifiers before loading data.",
                  language: "tsx",
                  filename: "ProfileRoute.tsx",
                  code: `function ProfileRoute({ route }: Props) {
  const userId = parseUserId(route.params.userId);
  if (!userId) return <InvalidLinkScreen />;
  return <AuthorizedProfileRoute userId={userId} />;
}`,
                },
                kotlin: {
                  name: "Validated destination argument",
                  summary:
                    "The destination validates decoded external data before creating screen state.",
                  language: "kotlin",
                  filename: "ProfileGraph.kt",
                  code: `composable<ProfileRoute> { entry ->
    val userId = UserId.parse(entry.toRoute<ProfileRoute>().userId)
    if (userId == null) InvalidLinkScreen()
    else AuthorizedProfileRoute(userId)
}`,
                },
              },
            },
            {
              id: "production",
              title: "Production",
              description:
                "Coordinate platform link registration, authorization, and in-app navigation behavior.",
              examples: {
                "react-native": {
                  name: "Session-aware link handling",
                  summary:
                    "An unauthenticated link is retained until sign-in completes.",
                  language: "typescript",
                  filename: "link-handler.ts",
                  code: `async function handleIncomingUrl(url: string) {
  const destination = parseAndValidateLink(url);
  if (!destination) return;
  if (!session.isSignedIn()) {
    pendingLinks.save(destination);
    return navigation.navigate("SignIn");
  }
  navigation.navigate(destination.name, destination.params);
}`,
                },
                kotlin: {
                  name: "Authorized deep-link boundary",
                  summary:
                    "Validated navigation waits for session state and checks access before opening data.",
                  language: "kotlin",
                  filename: "DeepLinkHandler.kt",
                  code: `suspend fun handleDeepLink(uri: Uri) {
    val destination = parser.parseAndValidate(uri) ?: return
    if (!session.isSignedIn()) {
        pendingLinks.save(destination)
        return navigator.openSignIn()
    }
    if (authorization.canOpen(destination)) navigator.open(destination)
}`,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: "async-networking",
      title: "Async & Networking",
      order: 40,
      lessons: [
        {
          conceptSlug: "async",
          title: "Async Work",
          order: 10,
          exercise:
            "Replace an effect-driven request with a lifecycle-aware coroutine.",
          checklist: [
            "Understands cancellation",
            "Avoids work during composition",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Start asynchronous work from a controlled effect.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Restart work when a key changes.",
            },
            {
              id: "production",
              title: "Production",
              description: "Keep long-lived work in a ViewModel.",
            },
          ],
        },
        {
          conceptSlug: "loading-state",
          title: "Loading State",
          order: 15,
          exercise:
            "Render initial loading, refresh, and an empty result as distinct states for one profile list.",
          checklist: [
            "Does not use null to mean every non-ready state",
            "Can explain the refresh policy",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render an explicit in-progress state.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Model loading, ready, and empty results without overlapping meanings.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Preserve useful content during refresh when the product experience calls for it.",
            },
          ],
        },
        {
          conceptSlug: "error-handling",
          title: "Error Handling",
          order: 17,
          exercise:
            "Map an offline request failure to friendly copy and a retry event without exposing the raw exception.",
          checklist: [
            "Separates cancellation from failure",
            "Provides an intentional recovery action",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render one recoverable error state.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Map transport errors to displayable failure models and retry events.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Preserve diagnostics safely while presenting stable, localizable user copy.",
            },
          ],
        },
        {
          conceptSlug: "api-request",
          title: "API Request",
          order: 20,
          exercise:
            "Model loading, success, and failure for a profile request.",
          checklist: ["Models each state", "Keeps transport out of UI"],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Render loading and success.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Add retry and error UI.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Expose immutable UI state from a repository-backed ViewModel.",
            },
          ],
        },
        {
          conceptSlug: "pagination",
          title: "Pagination",
          order: 30,
          exercise:
            "Append cursor-based pages while preserving existing rows and exposing append retry.",
          checklist: [
            "Guards duplicate requests",
            "Separates initial and append states",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Load a second page from the list boundary.",
            },
            {
              id: "applied",
              title: "Applied",
              description: "Model cursor, exhausted, and append-error states.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Deduplicate stable IDs and preserve content during retry.",
            },
          ],
        },
      ],
    },
    {
      id: "storage",
      title: "Storage",
      order: 45,
      lessons: [
        {
          conceptSlug: "local-storage",
          title: "Local Storage",
          order: 10,
          exercise:
            "Persist a theme preference, load its default safely, and update the screen when the stored value changes.",
          checklist: [
            "Treats persisted data as untrusted input",
            "Keeps storage access out of reusable UI",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Read and write one small preference asynchronously.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Expose stored preferences through a state holder instead of directly from UI components.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Version stored values, recover from bad data, and choose the appropriate store for sensitivity and scale.",
            },
          ],
        },
        {
          conceptSlug: "secure-storage",
          title: "Secure Storage",
          order: 20,
          exercise:
            "Move a refresh token from ordinary preferences behind a secure credential-store interface.",
          checklist: [
            "Never logs credentials",
            "Handles key invalidation and sign-out cleanup",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Read, write, and clear one credential through an abstraction.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Use platform-backed key protection and recover from unavailable data.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Define rotation, invalidation, backup, and sign-out policy.",
            },
          ],
        },
      ],
    },
    {
      id: "app-architecture",
      title: "App Architecture",
      order: 50,
      lessons: [
        {
          conceptSlug: "authentication",
          title: "Authentication",
          order: 10,
          exercise:
            "Build one root session gate for restoring, signed-out, and signed-in states.",
          checklist: [
            "Separates authentication from authorization",
            "Centralizes session transitions",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description:
                "Select the public or authenticated graph from state.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Restore and refresh a session through one state owner.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Handle expiry, concurrent refresh, revocation, and atomic sign-out.",
            },
          ],
        },
        {
          conceptSlug: "theme",
          title: "Theme",
          order: 20,
          exercise:
            "Map semantic React Native tokens to light and dark Material color schemes.",
          checklist: [
            "Uses semantic color roles",
            "Supports system, light, and dark preference",
          ],
          stages: [
            {
              id: "basic",
              title: "Basic",
              description: "Apply color and typography through MaterialTheme.",
            },
            {
              id: "applied",
              title: "Applied",
              description:
                "Persist a user choice while supporting the system default.",
            },
            {
              id: "production",
              title: "Production",
              description:
                "Validate contrast, dynamic changes, and launch behavior.",
            },
          ],
        },
      ],
    },
  ],
} as const;
