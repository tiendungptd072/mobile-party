export const flowAndStateFlowConcept = {
  id: "flow-and-stateflow",
  slug: "flow-and-stateflow",
  title: "Flow and StateFlow",
  description:
    "Separate a cold stream of data changes from hot screen state, and collect StateFlow with the Android screen lifecycle.",
  category: "async",
  order: 40.5,
  aliases: ["Flow", "stateIn", "SharingStarted.WhileSubscribed"],
  keywords: [
    "cold stream",
    "hot state",
    "collector",
    "subscription",
    "sharing",
  ],
  implementations: {
    "react-native": {
      name: "Read an external store snapshot",
      summary:
        "An app-owned store supplies a current immutable snapshot and a cleanup-returning subscribe function.",
      language: "tsx",
      filename: "FeedRoute.tsx",
      code: `function FeedRoute() {
  const state = useSyncExternalStore(feedStore.subscribe, feedStore.getSnapshot);
  return <FeedScreen state={state} />;
}`,
    },
    kotlin: {
      name: "Collect screen StateFlow",
      summary:
        "The ViewModel exposes current state and Compose collects it only while the screen lifecycle is active.",
      language: "kotlin",
      filename: "FeedRoute.kt",
      code: `@Composable
fun FeedRoute(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    FeedScreen(state)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "An external React store and StateFlow can both expose current observable state, but a cold Flow runs anew for each collector until explicitly shared; StateFlow is hot and always has a current value.",
    },
  ],
  mentalModel:
    "Use a cold Flow for a recipe that produces values on collection; use StateFlow for current screen state. Put stateIn in an owning scope when one cold upstream should feed multiple UI collectors, then collect the result with lifecycle awareness.",
  differences: [
    "Each collection of a cold Flow can restart upstream work; StateFlow retains a latest value and needs an initial state.",
    "React useSyncExternalStore reads an immutable cached snapshot; it does not by itself create a stream, own a producer, or persist state.",
    "collectAsStateWithLifecycle stops collecting when the LifecycleOwner falls below STARTED by default; stateIn sharing policy controls upstream work separately.",
  ],
  commonMistakes: [
    "Collecting a cold network Flow independently from multiple places and accidentally duplicating requests.",
    "Returning a newly allocated object on every getSnapshot call or collecting a Flow directly in a composable body.",
  ],
  productionNotes: [
    "Use stateIn(viewModelScope, SharingStarted.WhileSubscribed(...), initialState) for shared screen state when its lifecycle policy fits the product, not as a universal default.",
    "Model loading, data, and failure explicitly; test first emission, re-subscription, and error behavior with controlled producers.",
  ],
} as const;
