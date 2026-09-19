export const androidActivityLifecycleConcept = {
  id: "android-activity-lifecycle",
  slug: "android-activity-lifecycle",
  title: "Android Activity and Screen Lifecycle",
  description:
    "Choose lifecycle-aware work for visible screens without treating React Native AppState, Activity callbacks, and composition as the same lifetime.",
  category: "lifecycle",
  order: 9.9,
  aliases: [
    "AppState",
    "LifecycleResumeEffect",
    "collectAsStateWithLifecycle",
    "onStart",
    "onStop",
  ],
  keywords: [
    "foreground",
    "background",
    "Activity lifecycle",
    "screen lifecycle",
    "cleanup",
  ],
  implementations: {
    "react-native": {
      name: "Observe application foreground changes",
      summary:
        "AppState reports app-wide foreground/background changes and requires listener cleanup.",
      language: "tsx",
      filename: "ForegroundTracker.tsx",
      code: `useEffect(() => {
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") analytics.trackVisible();
  });
  return () => subscription.remove();
}, [analytics]);`,
    },
    kotlin: {
      name: "React to a lifecycle event",
      summary:
        "LifecycleEventEffect observes the current LifecycleOwner inside Compose.",
      language: "kotlin",
      filename: "ForegroundTracker.kt",
      code: `@Composable
fun ForegroundTracker(analytics: Analytics) {
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
        analytics.trackVisible()
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
        "Both can react when a user returns, but AppState describes application-level activity while a Compose lifecycle effect follows its LifecycleOwner; neither is identical to React component mount/unmount.",
    },
  ],
  mentalModel:
    "Ask whose lifetime owns the work: application foreground, Activity visibility, screen visibility, or composition. Use a lifecycle-aware effect for paired platform resources and collectAsStateWithLifecycle for screen StateFlow; keep business data in a ViewModel or repository.",
  differences: [
    "AppState.active/background is not an Activity's ON_RESUME/ON_STOP timeline; another Android Activity can make React Native report background.",
    "A composable can leave composition while its Activity remains started, and an Activity can be recreated while a ViewModel retains screen state.",
    "collectAsStateWithLifecycle collects only while its LifecycleOwner meets the active state, STARTED by default; it does not make data persistent across process death.",
  ],
  commonMistakes: [
    "Starting a subscription in a composable body or Activity callback without matching cleanup, causing duplicate work after recreation.",
    "Using AppState alone as proof that a particular navigation screen is focused, or doing slow persistence in onPause.",
  ],
  productionNotes: [
    "Use LifecycleResumeEffect for a camera or similar resource that must stop on pause, and its onPauseOrDispose cleanup when the screen leaves composition.",
    "Use collectAsStateWithLifecycle for ViewModel StateFlow; test background/foreground, route changes, rotation, and process recreation separately because they exercise different lifetimes.",
  ],
} as const;
