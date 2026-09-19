export const coroutineScopesConcept = {
  id: "coroutine-scopes",
  slug: "coroutine-scopes",
  title: "Coroutine Scope and Cancellation",
  description:
    "Move from manually canceled React Native requests to structured coroutine work with a clear screen or ViewModel owner.",
  category: "async",
  order: 40.25,
  aliases: ["viewModelScope", "CancellationException", "AbortController"],
  keywords: [
    "structured concurrency",
    "Job",
    "cancellation",
    "lifetime",
    "dispatcher",
  ],
  implementations: {
    "react-native": {
      name: "Abort a superseded request",
      summary:
        "AbortController is explicit and must reach the API or repository that performs work.",
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
      name: "Own work with a coroutine scope",
      summary:
        "LaunchedEffect cancels and restarts its child coroutine when its key changes.",
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
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both can stop obsolete work, but JavaScript promises do not inherit React component cancellation; Kotlin child coroutines belong to a scope and receive cancellation through its Job hierarchy.",
    },
  ],
  mentalModel:
    "Choose the owner before launching: a composable effect for UI-keyed work, viewModelScope for work owned by screen state, or a longer-lived application scope only for work that truly outlives the screen. A suspend function is not itself a new thread.",
  differences: [
    "AbortController cancels only APIs that observe its signal; coroutine cancellation propagates to child Jobs but remains cooperative for blocking or non-cancellable work.",
    "LaunchedEffect restarts when its key changes or leaves composition; viewModelScope survives configuration recreation but is canceled when its ViewModel is cleared.",
    "A suspend function should be main-safe; the layer doing blocking work chooses an appropriate dispatcher rather than forcing every UI caller to switch threads.",
  ],
  commonMistakes: [
    "Replacing each promise with GlobalScope.launch, losing ownership and cancellation.",
    "Catching CancellationException as a normal failure or showing stale results after an aborted request completes.",
  ],
  productionNotes: [
    "Rethrow CancellationException when a broad catch is needed, and guard React Native results even if a data source ignores AbortSignal.",
    "Inject dispatchers at blocking-work boundaries so tests can control scheduling; do not perform blocking I/O on the main thread.",
  ],
} as const;
