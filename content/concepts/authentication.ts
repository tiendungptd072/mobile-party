export const authenticationConcept = {
  id: "authentication",
  slug: "authentication",
  title: "Authentication",
  category: "architecture",
  order: 62,
  description:
    "Model signed-in state and session recovery as an app boundary, not a conditional scattered through individual screens.",
  aliases: ["auth state", "session", "sign in", "refresh token"],
  keywords: [
    "authentication",
    "authorization",
    "session",
    "logout",
    "token refresh",
  ],
  implementations: {
    "react-native": {
      name: "Auth provider and navigation gate",
      summary:
        "An app-level state owner chooses public or authenticated navigation based on session state.",
      language: "typescript",
      filename: "app-gate.tsx",
      code: `function AppGate() {
  const { status } = useSession();
  if (status === "restoring") return <SplashScreen />;
  return status === "signedIn" ? <AppNavigator /> : <AuthNavigator />;
}`,
    },
    kotlin: {
      name: "Session ViewModel and navigation gate",
      summary:
        "A root composable collects immutable session state and selects the appropriate graph.",
      language: "kotlin",
      filename: "AppGate.kt",
      code: `@Composable
fun AppGate(viewModel: SessionViewModel = viewModel()) {
  val state by viewModel.state.collectAsStateWithLifecycle()

  when (state) {
    SessionState.Restoring -> SplashScreen()
    SessionState.SignedOut -> AuthNavGraph()
    is SessionState.SignedIn -> AppNavGraph()
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
        "Both let a root state owner select public or authenticated navigation after session restoration.",
    },
  ],
  mentalModel:
    "Authentication is state transition and navigation policy. Restore a session once at the app boundary, then expose a minimal signed-in or signed-out state to the UI.",
  differences: [
    "React Native often uses Context or a dedicated store at the app root.",
    "Compose commonly collects a ViewModel StateFlow at the root route.",
  ],
  commonMistakes: [
    "Navigating from every API failure independently or assuming a locally stored token is still valid without recovery and expiry handling.",
  ],
  productionNotes: [
    "Separate authentication from authorization, centralize refresh behavior, clear state atomically on sign-out, and verify access on the server.",
  ],
} as const;
