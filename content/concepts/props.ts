export const propsConcept = {
  id: "props",
  slug: "props",
  title: "Props and Parameters",
  description:
    "Pass immutable data and event callbacks into React components and composable functions.",
  category: "fundamentals",
  order: 11,
  aliases: ["parameters", "callback props"],
  keywords: ["input", "event", "unidirectional data flow", "state hoisting"],
  implementations: {
    "react-native": {
      name: "Component props",
      summary:
        "A typed props object carries values and callbacks into a component.",
      language: "tsx",
      filename: "UserCard.tsx",
      code: `type UserCardProps = {
  name: string;
  onOpen: () => void;
};

function UserCard({ name, onOpen }: UserCardProps) {
  return <Button title={name} onPress={onOpen} />;
}`,
    },
    kotlin: {
      name: "Composable parameters",
      summary: "Function parameters carry state down and event lambdas up.",
      language: "kotlin",
      filename: "UserCard.kt",
      code: `@Composable
fun UserCard(
    name: String,
    onOpen: () -> Unit,
) {
    Button(onClick = onOpen) { Text(name) }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Props and composable parameters serve the same boundary role: immutable values flow in and user events flow out through callbacks.",
    },
  ],
  mentalModel:
    "Treat a composable as a function with an explicit UI contract. Pass only the state it renders and callbacks for events it emits.",
  differences: [
    "React groups inputs in a props object; Kotlin exposes named function parameters.",
    "Compose lambdas commonly use Unit and can carry typed event data.",
  ],
  commonMistakes: [
    "Passing a ViewModel through every child instead of giving reusable composables only the values and events they need.",
  ],
  productionNotes: [
    "Prefer immutable parameters and stable event contracts; keep screen-level dependencies at the screen boundary.",
  ],
} as const;
