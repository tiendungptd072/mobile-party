export const lifecycleConcept = {
  id: "lifecycle",
  slug: "lifecycle",
  title: "Lifecycle and Cleanup",
  description:
    "Register and dispose external observers safely as UI enters and leaves its lifecycle.",
  category: "lifecycle",
  order: 38,
  aliases: ["cleanup", "unmount", "DisposableEffect", "LifecycleEventObserver"],
  keywords: ["subscribe", "unsubscribe", "observer", "dispose"],
  implementations: {
    "react-native": {
      name: "Effect cleanup",
      summary:
        "The returned function removes a subscription when dependencies change or the component unmounts.",
      language: "tsx",
      filename: "ConnectivityStatus.tsx",
      code: `useEffect(() => {
  const unsubscribe = netInfo.addEventListener(setConnection);
  return unsubscribe;
}, []);`,
    },
    kotlin: {
      name: "DisposableEffect",
      summary: "Registers an observer for a key and removes it from onDispose.",
      language: "kotlin",
      filename: "AnalyticsLifecycle.kt",
      code: `DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { _, event -> track(event) }
    lifecycleOwner.lifecycle.addObserver(observer)
    onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both bind subscription cleanup to UI lifetime, while Compose uses effect keys and an explicit onDispose block.",
    },
  ],
  mentalModel:
    "Map subscription setup and cleanup to DisposableEffect only when the resource is owned by composition. Android lifecycle collection APIs are preferable for observable screen state.",
  differences: [
    "A composable can enter or leave composition independently of an Activity lifecycle transition.",
    "DisposableEffect requires onDispose as the final statement.",
  ],
  commonMistakes: [
    "Assuming recomposition is equivalent to mount or unmount and repeatedly registering observers in the composable body.",
  ],
  productionNotes: [
    "Prefer lifecycle-aware adapters for Flow and use DisposableEffect for external listener APIs that truly require manual removal.",
  ],
} as const;
