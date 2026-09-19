export const snapshotStateConcept = {
  id: "snapshot-state",
  slug: "snapshot-state",
  title: "Observable Snapshot State",
  description:
    "Move from immutable React state updates to Compose snapshot-aware state without silently mutating an unobserved collection.",
  category: "lifecycle",
  order: 8.05,
  aliases: ["mutableStateListOf", "snapshot state", "observable collections"],
  keywords: ["state", "snapshot", "mutation", "collection", "recomposition"],
  implementations: {
    "react-native": {
      name: "Replace an array in state",
      summary: "Return a new array so React receives an updated state value.",
      language: "tsx",
      filename: "Tags.tsx",
      code: `function Tags() {
  const [tags, setTags] = useState<string[]>([]);
  return <Button title={String(tags.length)} onPress={() =>
    setTags((current) => [...current, "new"])
  } />;
}`,
    },
    kotlin: {
      name: "Mutate an observable list",
      summary: "SnapshotStateList reports its changes to Compose readers.",
      language: "kotlin",
      filename: "Tags.kt",
      code: `@Composable
fun Tags() {
    val tags = remember { mutableStateListOf<String>() }
    Button(onClick = { tags.add("new") }) {
        Text(tags.size.toString())
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
        "Both make state changes visible to declarative UI, but React relies on a new state value while Compose snapshot-aware containers can observe mutations to their own contents.",
    },
  ],
  mentalModel:
    "Choose an observable state holder at the owner boundary. In Compose, mutating a plain MutableList inside remember does not notify the runtime; replace an immutable List in MutableState or use SnapshotStateList for local collection edits.",
  differences: [
    "React array state should be replaced rather than mutated; Compose SnapshotStateList supports observable add and remove operations.",
    "A plain Kotlin MutableList is still unobserved even if remember keeps the same list instance across recompositions.",
  ],
  commonMistakes: [
    "Using remember { mutableListOf(...) } and expecting an add call to update the UI.",
  ],
  productionNotes: [
    "Expose read-only UI data outside a state owner; use snapshot-aware mutation only where that owner controls it.",
  ],
} as const;
