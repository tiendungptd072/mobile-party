export const componentConcept = {
  id: "component",
  slug: "component",
  title: "Component",
  description: "Compare reusable UI units in React Native and Jetpack Compose.",
  category: "fundamentals",
  order: 10,
  aliases: ["React component", "Composable"],
  keywords: ["component", "composable", "UI function"],
  implementations: {
    "react-native": {
      name: "Function component",
      summary: "A function returns React elements from props and state.",
      language: "tsx",
      filename: "Greeting.tsx",
      code: `type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <Text>Hello, {name}</Text>;
}`,
    },
    kotlin: {
      name: "Composable function",
      summary: "A function annotated with @Composable describes UI.",
      language: "kotlin",
      filename: "Greeting.kt",
      code: `@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name")
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both compose UI from functions, but React rendering and Compose recomposition use different runtimes.",
    },
  ],
  mentalModel:
    "Translate a React function component into a composable function, then relearn how identity, recomposition, and state lifetime work in Compose.",
  differences: [
    "Compose marks UI functions with @Composable.",
    "The frameworks use different rules for skipping and scheduling UI work.",
  ],
  commonMistakes: [
    "Treating every composable invocation as a persistent component instance.",
  ],
  productionNotes: [
    "Keep composables focused and hoist state when callers need ownership or reuse.",
  ],
} as const;
