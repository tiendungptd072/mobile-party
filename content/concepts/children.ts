export const childrenConcept = {
  id: "children",
  slug: "children",
  title: "Children and Content Slots",
  description:
    "Compose reusable containers with React children and Compose content lambdas.",
  category: "fundamentals",
  order: 12,
  aliases: ["content lambda", "slot API"],
  keywords: ["composition", "container", "slot", "content"],
  implementations: {
    "react-native": {
      name: "ReactNode children",
      summary: "The children prop lets callers provide nested React elements.",
      language: "tsx",
      filename: "Panel.tsx",
      code: `function Panel({ children }: { children: ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

<Panel><Text>Profile</Text></Panel>`,
    },
    kotlin: {
      name: "Composable content lambda",
      summary: "A @Composable lambda lets callers fill a named content slot.",
      language: "kotlin",
      filename: "Panel.kt",
      code: `@Composable
fun Panel(content: @Composable () -> Unit) {
    Surface(shape = RoundedCornerShape(12.dp)) { content() }
}

Panel { Text("Profile") }`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both support caller-provided nested UI, while Compose models slots explicitly as composable function parameters.",
    },
  ],
  mentalModel:
    "Translate children into a content lambda. When a container has several insertion points, give each slot a meaningful named lambda.",
  differences: [
    "React has a conventional children prop.",
    "Compose can expose multiple typed slots with receiver scopes and parameters.",
  ],
  commonMistakes: [
    "Creating a large boolean-driven container instead of exposing focused slots that callers can compose.",
  ],
  productionNotes: [
    "Use slot APIs for flexible layout and keep the container responsible for structure, not the caller's content state.",
  ],
} as const;
