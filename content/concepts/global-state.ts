export const globalStateConcept = {
  id: "global-state",
  slug: "global-state",
  title: "Screen and Shared State",
  description:
    "Compare an external React store with ViewModel and StateFlow ownership on Android.",
  category: "architecture",
  order: 24,
  aliases: ["Zustand", "ViewModel", "StateFlow", "shared state"],
  keywords: [
    "store",
    "screen state",
    "state holder",
    "collectAsStateWithLifecycle",
  ],
  implementations: {
    "react-native": {
      name: "External store selector",
      summary: "A component subscribes to the smallest state slice it renders.",
      language: "tsx",
      filename: "ProfileScreen.tsx",
      code: `function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);
  return <Profile user={user} onSignOut={signOut} />;
}`,
    },
    kotlin: {
      name: "ViewModel + StateFlow",
      summary:
        "A screen collects immutable state from a lifecycle-aware state holder.",
      language: "kotlin",
      filename: "ProfileScreen.kt",
      code: `@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    ProfileScreen(uiState, viewModel::signOut)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both expose shared observable state, but a ViewModel is a lifecycle-scoped screen state holder rather than a direct replacement for a process-wide JavaScript store.",
    },
  ],
  mentalModel:
    "Start by assigning state to the lowest owner that needs it. Use a ViewModel for screen state and business logic; do not translate every global store into one global Android object.",
  differences: [
    "ViewModel lifetime is controlled by a ViewModelStoreOwner such as a destination or navigation graph.",
    "StateFlow collection should be lifecycle-aware in Android Compose UI.",
  ],
  commonMistakes: [
    "Putting all app state into one ViewModel or passing the ViewModel into deeply reusable composables.",
  ],
  productionNotes: [
    "Expose immutable UI state and intent methods from the ViewModel, then pass plain state and callbacks to the screen content.",
  ],
} as const;
