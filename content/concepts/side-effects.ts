export const sideEffectsConcept = {
  id: "side-effects",
  slug: "side-effects",
  title: "Side Effects",
  description:
    "Run lifecycle-aware work with React useEffect and Compose effect APIs.",
  category: "lifecycle",
  order: 37,
  aliases: ["useEffect", "LaunchedEffect", "Compose effect", "effect key"],
  keywords: ["effect", "cleanup", "cancellation", "lifecycle"],
  implementations: {
    "react-native": {
      name: "useEffect",
      summary:
        "Runs an effect after render and restarts it when a dependency changes.",
      language: "tsx",
      filename: "ProfileScreen.tsx",
      code: `useEffect(() => {
  const controller = new AbortController();
  loadProfile(userId, controller.signal);
  return () => controller.abort();
}, [userId]);`,
    },
    kotlin: {
      name: "LaunchedEffect",
      summary:
        "Launches a composition-scoped coroutine and restarts it when a key changes.",
      language: "kotlin",
      filename: "ProfileScreen.kt",
      code: `LaunchedEffect(userId) {
    viewModel.loadProfile(userId)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "The APIs overlap for keyed lifecycle work, but Compose provides separate effect APIs for coroutines, cleanup, and publishing state outside Compose.",
    },
  ],
  mentalModel:
    "Do not mechanically replace every useEffect with LaunchedEffect. First identify whether the work belongs to composition, needs cleanup, or should live in a ViewModel.",
  differences: [
    "LaunchedEffect owns a coroutine that is cancelled when it leaves composition.",
    "DisposableEffect is the dedicated API for registration that requires cleanup.",
  ],
  commonMistakes: [
    "Launching business work directly in a composable body or using a constant effect key without understanding its lifetime.",
  ],
  productionNotes: [
    "Keep effect work UI-related; move long-lived data loading and business orchestration to a lifecycle-aware state holder.",
  ],
} as const;
