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
    "Use remember for composition-local state, rememberSaveable for small UI values that should survive supported recreation, SavedStateHandle for ViewModel-owned restoration inputs, and a repository for durable data.",
  differences: [
    "ViewModel survives configuration change but does not itself preserve arbitrary fields after process death.",
    "Saved state is a small restoration aid, not a database or a guarantee after user-initiated termination.",
  ],
  commonMistakes: [
    "Saving an entire response or mutable graph in a Bundle instead of saving an ID and reloading from a repository.",
  ],
  productionNotes: [
    "Test rotation and system-initiated process recreation separately, and keep saveable payloads small and serializable.",
  ],
} as const;
