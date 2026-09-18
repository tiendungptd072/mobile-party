export const deepLinkConcept = {
  id: "deep-link",
  slug: "deep-link",
  title: "Deep Links",
  description:
    "Map an incoming URL to a validated application destination in React Navigation and Navigation Compose.",
  category: "navigation",
  order: 47,
  aliases: ["linking config", "navDeepLink", "universal link", "app link"],
  keywords: ["URL", "uri pattern", "external route", "linking"],
  implementations: {
    "react-native": {
      name: "Linking configuration",
      summary: "React Navigation maps URL patterns to screen names and params.",
      language: "tsx",
      filename: "linking.ts",
      code: `export const linking = {
  prefixes: ["mobileparty://", "https://mobile.party"],
  config: { screens: { Profile: "profiles/:userId" } },
};`,
    },
    kotlin: {
      name: "Navigation deep link",
      summary: "A composable destination declares the URI pattern it accepts.",
      language: "kotlin",
      filename: "ProfileDestination.kt",
      code: `composable<Profile>(
    deepLinks = listOf(navDeepLink {
        uriPattern = "mobileparty://profiles/{userId}"
    }),
) { entry ->
    ProfileScreen(entry.toRoute<Profile>().userId)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both map external URL patterns into navigation state, but platform registration and graph configuration remain framework-specific.",
    },
  ],
  mentalModel:
    "A deep link is untrusted input that happens to choose a destination. Parse the route, validate the argument, then load authorized current data.",
  differences: [
    "React Navigation centralizes URL parsing in linking configuration.",
    "Navigation Compose can declare deep links next to each destination in the graph.",
  ],
  commonMistakes: [
    "Navigating directly with unvalidated path data or handling incoming links manually outside the navigation system.",
  ],
  productionNotes: [
    "Keep URL patterns, Android App Links or iOS Universal Links, authorization checks, and in-app routes aligned.",
  ],
} as const;
