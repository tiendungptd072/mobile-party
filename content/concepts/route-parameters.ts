export const routeParametersConcept = {
  id: "route-parameters",
  slug: "route-parameters",
  title: "Route Parameters",
  description:
    "Pass small, serializable identifiers through a route and load screen data from an owning layer.",
  category: "navigation",
  order: 46,
  aliases: [
    "navigation params",
    "route params",
    "NavBackStackEntry",
    "toRoute",
  ],
  keywords: ["userId", "serializable", "destination argument", "deep link"],
  implementations: {
    "react-native": {
      name: "Route params",
      summary:
        "The destination reads a serializable identifier from route.params.",
      language: "tsx",
      filename: "ProfileScreen.tsx",
      code: `function ProfileScreen({ route }: Props) {
  const { userId } = route.params;
  const user = useUser(userId);
  return <Profile user={user} />;
}`,
    },
    kotlin: {
      name: "Typed route argument",
      summary:
        "The NavHost decodes a route argument before calling screen content.",
      language: "kotlin",
      filename: "ProfileDestination.kt",
      code: `@Serializable
data class Profile(val userId: String)

composable<Profile> { entry ->
    ProfileScreen(userId = entry.toRoute<Profile>().userId)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both route systems should carry compact serializable arguments such as IDs, not full mutable domain objects.",
    },
  ],
  mentalModel:
    "A route parameter identifies what to show, not the complete data to show. Resolve current data in a repository or screen state holder.",
  differences: [
    "React Navigation params are read from the route object.",
    "Navigation Compose can use serializable route classes and decode them from the back stack entry.",
  ],
  commonMistakes: [
    "Passing a full user object through navigation, which duplicates stale data and makes deep links harder to validate.",
  ],
  productionNotes: [
    "Validate arguments at the destination boundary and make route types stable because external links may persist for a long time.",
  ],
} as const;
