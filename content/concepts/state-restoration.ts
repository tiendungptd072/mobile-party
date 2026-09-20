export const stateRestorationConcept = {
  id: "state-restoration",
  slug: "state-restoration",
  title: "State Lifetime and Restoration",
  description:
    "Choose state ownership deliberately across recomposition, configuration change, system-initiated process death, and durable storage.",
  category: "lifecycle",
  order: 8.2,
  aliases: [
    "rememberSaveable",
    "SavedStateHandle",
    "process death",
    "state lifetime",
  ],
  keywords: [
    "restoration",
    "remember",
    "rememberSaveable",
    "ViewModel",
    "process death",
  ],
  implementations: {
    "react-native": {
      name: "Local draft state",
      summary:
        "useState retains a draft while its React component instance remains mounted.",
      language: "tsx",
      filename: "SearchDraft.tsx",
      code: `function SearchDraft() {
  const [query, setQuery] = useState("");
  return <TextInput value={query} onChangeText={setQuery} />;
}`,
    },
    kotlin: {
      name: "Saveable local draft",
      summary:
        "rememberSaveable also restores a small saveable value after supported Android recreation.",
      language: "kotlin",
      filename: "SearchDraft.kt",
      code: `@Composable
fun SearchDraft() {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "useState and rememberSaveable both hold local UI state, but their restoration guarantees and platform lifetimes are not equivalent.",
    },
  ],
  mentalModel:
    "Use remember for composition-local state, rememberSaveable for small UI values that should survive supported recreation, SavedStateHandle for ViewModel-owned restoration inputs, and a repository for durable data. In React Native, persistence of a route ID or draft requires an explicit app or navigation policy; useState alone has no matching Android saved-state contract.",
  differences: [
    "ViewModel survives configuration change but does not itself preserve arbitrary fields after process death.",
    "Saved state is a small restoration aid, not a database or a guarantee after user-initiated termination.",
    "React Navigation can persist serializable navigation state across app restart when configured; it does not make screen-local useState durable. A deep link can also supply the route ID without restoring the prior navigation stack.",
  ],
  commonMistakes: [
    "Saving an entire response or mutable graph in a Bundle instead of saving an ID and reloading from a repository.",
    "Treating rotation or ActivityScenario.recreate() as proof that state survives system-initiated process death.",
    "Using force-stop or swiping away the task to test a saved-state guarantee intended for system-initiated recreation.",
  ],
  productionNotes: [
    "Test rotation and system-initiated process recreation separately, and keep saveable payloads small and serializable.",
    "For a device drill, open a detail route, background the app, run adb shell am kill <package>, then return through Recents. Verify the route ID, small draft, loading state, and freshly loaded domain data. Do not use am force-stop for this drill.",
    "A SavedStateHandle constructed directly in a unit test is not bound to a SavedStateRegistryOwner. Use a device-level recreation check for the Android restoration claim; use unit tests for ID-to-repository behavior.",
  ],
} as const;
