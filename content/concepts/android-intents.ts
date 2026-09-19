export const androidIntentsConcept = {
  id: "android-intents",
  slug: "android-intents",
  title: "Android Intents and External Actions",
  description:
    "Compare React Native Linking and Share with Android Intents for opening, sharing, and receiving external input.",
  category: "navigation",
  order: 9.75,
  aliases: [
    "Intent.ACTION_VIEW",
    "Intent.ACTION_SEND",
    "intent filter",
    "Linking.openURL",
  ],
  keywords: [
    "intent",
    "chooser",
    "external URL",
    "deep link",
    "platform boundary",
  ],
  implementations: {
    "react-native": {
      name: "Open a web link through Linking",
      summary:
        "Linking asks the native platform to handle a URL and rejects when it cannot open it.",
      language: "tsx",
      filename: "open-help.ts",
      code: `async function openHelp() {
  try {
    await Linking.openURL("https://example.com/help");
  } catch {
    showUnavailable();
  }
}`,
    },
    kotlin: {
      name: "Dispatch an implicit ACTION_VIEW Intent",
      summary:
        "Android resolves the Intent to an Activity that can handle the URL.",
      language: "kotlin",
      filename: "OpenHelp.kt",
      code: `fun openHelp(context: Context) {
    val uri = Uri.parse("https://example.com/help")
    try {
        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
    } catch (_: ActivityNotFoundException) {
        showUnavailable()
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
        "Linking and Share expose common external actions, while Android Intents are the platform message and resolution mechanism beneath those behaviors. An Intent is not a one-to-one replacement for an in-app navigation route.",
    },
  ],
  mentalModel:
    "Separate in-app destinations from cross-app requests. An implicit Intent describes an action and data for Android to resolve; an explicit Intent names a component. An intent filter declares what your app can receive, and all incoming data must be validated before routing.",
  differences: [
    "Linking.openURL is a JavaScript-facing API; ACTION_VIEW and ACTION_SEND are Android actions resolved against installed apps and their intent filters.",
    "A cold deep link arrives as initial URL or Activity intent; a link delivered to an existing instance uses a listener or onNewIntent only when its Android launch behavior reuses that Activity.",
    "A manifest filter makes an Activity eligible for an implicit Intent; it does not validate path parameters or establish HTTPS App Link ownership by itself.",
  ],
  commonMistakes: [
    "Using an Android Intent as if it were a Compose navigation route, or assuming every device has an Activity for an external action.",
    "Handling only cold-start links while missing subsequent links, or trusting an external URI without parsing and validation.",
  ],
  productionNotes: [
    "Use a chooser when asking the user to share, and provide a usable fallback when an external action cannot be handled.",
    "Test cold and warm link delivery against the actual manifest and launch mode; verify HTTPS App Links separately when the product requires domain ownership.",
  ],
} as const;
