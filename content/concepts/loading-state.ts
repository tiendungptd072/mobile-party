export const loadingStateConcept = {
  id: "loading-state",
  slug: "loading-state",
  title: "Loading State",
  description:
    "Represent an in-progress operation explicitly instead of inferring it from missing data.",
  category: "state",
  order: 41,
  aliases: [
    "isLoading",
    "spinner",
    "progress indicator",
    "CircularProgressIndicator",
  ],
  keywords: ["loading", "pending", "refresh", "skeleton", "ui state"],
  implementations: {
    "react-native": {
      name: "ActivityIndicator with UI state",
      summary:
        "A dedicated status controls loading UI while data remains a separate value.",
      language: "typescript",
      filename: "profile-screen.tsx",
      code: `type ProfileState =
  | { status: "loading" }
  | { status: "ready"; profile: Profile };

function ProfileScreen({ state }: { state: ProfileState }) {
  if (state.status === "loading") return <ActivityIndicator />;

  return <ProfileCard profile={state.profile} />;
}`,
    },
    kotlin: {
      name: "CircularProgressIndicator with sealed UI state",
      summary:
        "An exhaustive when expression renders the explicit state exposed by the screen owner.",
      language: "kotlin",
      filename: "ProfileScreen.kt",
      code: `sealed interface ProfileUiState {
  data object Loading : ProfileUiState
  data class Ready(val profile: Profile) : ProfileUiState
}

@Composable
fun ProfileScreen(state: ProfileUiState) = when (state) {
  ProfileUiState.Loading -> CircularProgressIndicator()
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
        "Both render a progress indicator from state; Kotlin sealed types make the set of renderable states explicit and exhaustive.",
    },
  ],
  mentalModel:
    "Loading is a real UI state, not an absence of content. Keep it distinct from empty, error, and successfully loaded data.",
  differences: [
    "React commonly uses a discriminated union or boolean plus data; Compose often models the same states with a sealed interface.",
    "Compose checks all sealed branches in when expressions at compile time.",
  ],
  commonMistakes: [
    "Using an empty list or null data to mean both loading and an actual empty result.",
  ],
  productionNotes: [
    "Decide whether refresh preserves current content, then expose that policy clearly in immutable screen state.",
  ],
} as const;
