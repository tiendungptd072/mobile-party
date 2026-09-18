export const navigationConcept = {
  id: "navigation",
  slug: "navigation",
  title: "Navigation",
  description:
    "Move between destinations with React Navigation and Navigation Compose.",
  category: "navigation",
  order: 45,
  aliases: ["React Navigation", "NavController", "NavHost", "navigate"],
  keywords: ["destination", "back stack", "route", "screen"],
  implementations: {
    "react-native": {
      name: "React Navigation",
      summary: "A screen requests navigation through the navigation object.",
      language: "tsx",
      filename: "HomeScreen.tsx",
      code: `function HomeScreen({ navigation }: Props) {
  return (
    <Button
      title="Open profile"
      onPress={() => navigation.navigate("Profile", { userId: "42" })}
    />
  );
}`,
    },
    kotlin: {
      name: "Navigation Compose",
      summary:
        "A route-level callback asks NavController to navigate to a destination.",
      language: "kotlin",
      filename: "HomeRoute.kt",
      code: `@Composable
fun HomeRoute(navController: NavController) {
    HomeScreen(onOpenProfile = { userId ->
        navController.navigate(Profile(userId))
    })
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both navigate through a graph and back stack, while modern Navigation Compose can model destinations as serializable route types.",
    },
  ],
  mentalModel:
    "Keep navigation at the route boundary. Presentational screens should receive navigation callbacks, not a navigation controller, so they remain easy to test.",
  differences: [
    "React Navigation typically passes a navigation object to a screen.",
    "Navigation Compose associates one NavController with one NavHost and graph.",
  ],
  commonMistakes: [
    "Passing NavController deep into reusable composables or treating navigation as ordinary local UI state.",
  ],
  productionNotes: [
    "Define one graph per navigation scope and test the NavHost separately from destination UI.",
  ],
} as const;
