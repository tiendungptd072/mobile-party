export const recompositionConcept = {
  id: "recomposition",
  slug: "recomposition",
  title: "Render and Recomposition",
  description:
    "Compare React rendering with Compose recomposition without treating either as an imperative redraw of the entire screen.",
  category: "lifecycle",
  order: 8,
  aliases: ["composition", "re-render", "snapshot read"],
  keywords: ["render", "recomposition", "state read", "pure UI"],
  implementations: {
    "react-native": {
      name: "Render from state",
      summary: "A state update schedules React to call the component again.",
      language: "tsx",
      filename: "Counter.tsx",
      code: `function Counter() {
  const [count, setCount] = useState(0);
  return <Button title={String(count)} onPress={() => setCount((n) => n + 1)} />;
}`,
    },
    kotlin: {
      name: "Recompose from snapshot state",
      summary:
        "Reading observable state lets Compose update affected composition scopes.",
      language: "kotlin",
      filename: "Counter.kt",
      code: `@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    Button(onClick = { count++ }) { Text("$count") }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both describe UI from state, but React render and Compose recomposition have different scheduling, scope, and skipping rules.",
    },
  ],
  mentalModel:
    "Write composables as descriptions of current state. A state read makes a scope eligible for recomposition; it does not mean every composable on the screen must execute again.",
  differences: [
    "Compose tracks snapshot-state reads within composition scopes; React schedules component renders from state updates.",
    "Either runtime may skip work, so never rely on a render or recomposition call count for business behavior.",
  ],
  commonMistakes: [
    "Starting network work or mutating external state directly while a composable executes.",
  ],
  productionNotes: [
    "Keep UI functions side-effect free and move external work into an appropriate effect or state owner.",
  ],
} as const;
