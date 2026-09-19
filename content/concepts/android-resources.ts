export const androidResourcesConcept = {
  id: "android-resources",
  slug: "android-resources",
  title: "Android Resources and Localization",
  description:
    "Move UI text into locale-aware Android resources and read it from Compose, including formatted strings and plurals.",
  category: "build",
  order: 9.5,
  aliases: [
    "strings.xml",
    "stringResource",
    "pluralStringResource",
    "res/values-vi",
  ],
  keywords: ["localization", "resources", "translation", "plural", "locale"],
  implementations: {
    "react-native": {
      name: "Read from the app's translation layer",
      summary:
        "React Native does not provide this t() function; the application or its chosen i18n library owns it.",
      language: "tsx",
      filename: "Welcome.tsx",
      code: `function Welcome({ t }: { t: (key: "welcome") => string }) {
  return <Text>{t("welcome")}</Text>;
}`,
    },
    kotlin: {
      name: "Read an Android string resource",
      summary:
        "Compose's stringResource reads the matching Android resource for the current configuration.",
      language: "kotlin",
      filename: "Welcome.kt",
      code: `@Composable
fun Welcome() {
    Text(stringResource(R.string.welcome))
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both display locale-specific text, but React Native uses an application-selected translation layer while Compose reads resources selected by Android's configuration system.",
    },
  ],
  mentalModel:
    "Map translation keys to R.string IDs, put default text in res/values/strings.xml and Vietnamese text in res/values-vi/strings.xml, then call stringResource inside composables. Keep the default resource complete as a fallback.",
  differences: [
    "Android generates typed R identifiers from resource names and selects qualifiers such as values-vi; a React Native t() helper is application code, not a framework API.",
    "For dynamic text, Android XML uses format arguments and quantity resources; do not build translatable sentences by concatenating fragments.",
    "UI strings should be read from the current configuration when rendering, not cached in a singleton at startup.",
  ],
  commonMistakes: [
    "Assuming React Native has a built-in t() API or that one English plural rule works for every locale.",
    "Hardcoding translated text in composables, or omitting a default resource when adding a localized variant.",
  ],
  productionNotes: [
    "Check actual device locales and formatted values in UI tests; changes of configuration should display the newly selected resource.",
    "Use pluralStringResource for quantity-dependent grammar and pass the count again only when the selected string formats that number.",
  ],
} as const;
