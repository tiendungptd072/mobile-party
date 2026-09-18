export const errorHandlingConcept = {
  id: "error-handling",
  slug: "error-handling",
  title: "Error Handling",
  description:
    "Translate request failures into intentional recovery UI rather than showing raw transport errors.",
  category: "async",
  order: 42,
  aliases: ["try catch", "retry", "failure state", "Result"],
  keywords: ["error", "exception", "retry", "offline", "failure"],
  implementations: {
    "react-native": {
      name: "Typed failure UI",
      summary:
        "A recoverable error state supplies a retry action to the screen.",
      language: "typescript",
      filename: "profile-screen.tsx",
      code: `type ProfileState =
  | { status: "ready"; profile: Profile }
  | { status: "error"; message: string };

function ProfileScreen({ state, retry }: Props) {
  if (state.status === "error") {
    return <ErrorPanel message={state.message} onRetry={retry} />;
  }

  return <ProfileCard profile={state.profile} />;
}`,
    },
    kotlin: {
      name: "Recoverable sealed UI state",
      summary:
        "The ViewModel maps expected failures to a displayable state and retry event.",
      language: "kotlin",
      filename: "ProfileScreen.kt",
      code: `sealed interface ProfileUiState {
  data class Ready(val profile: Profile) : ProfileUiState
  data class Error(val message: String) : ProfileUiState
}

@Composable
fun ProfileScreen(state: ProfileUiState, onRetry: () -> Unit) = when (state) {
  is ProfileUiState.Error -> ErrorPanel(state.message, onRetry)
  is ProfileUiState.Ready -> ProfileCard(state.profile)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both convert expected failures into a UI state with a recovery event; Compose commonly uses a sealed state model for exhaustive rendering.",
    },
  ],
  mentalModel:
    "Exceptions belong at a work boundary. The UI should receive a small, actionable failure model instead of an HTTP client exception.",
  differences: [
    "JavaScript errors are usually caught around an awaited promise; Kotlin handles exceptions around suspending work in the owning coroutine.",
    "Kotlin can also model expected domain failures with Result or a domain-specific sealed type.",
  ],
  commonMistakes: [
    "Exposing exception messages directly to users or treating cancellation as a user-visible failure.",
  ],
  productionNotes: [
    "Map transport and parsing failures to stable domain errors, log diagnostic details safely, and make retry idempotent where possible.",
  ],
} as const;
