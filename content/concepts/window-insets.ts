export const windowInsetsConcept = {
  id: "window-insets",
  slug: "window-insets",
  title: "Safe Areas, System Bars, and IME Insets",
  description:
    "Keep mobile content reachable around cutouts, system bars, and the keyboard when moving from React Native safe-area handling to edge-to-edge Compose.",
  category: "layout",
  order: 25.6,
  aliases: ["SafeAreaView", "safeDrawingPadding", "imePadding", "edge to edge"],
  keywords: ["safe area", "system bars", "keyboard", "insets", "IME"],
  implementations: {
    "react-native": {
      name: "Safe-area inset padding",
      summary:
        "Read current safe-area insets and apply only the edge padding the screen needs.",
      language: "tsx",
      filename: "ProfileScreen.tsx",
      code: `function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return <View style={{ flex: 1, paddingTop: insets.top }}><Profile /></View>;
}`,
    },
    kotlin: {
      name: "Safe drawing padding",
      summary:
        "Apply Compose safe-drawing insets to controls that must stay clear of system UI.",
      language: "kotlin",
      filename: "ProfileScreen.kt",
      code: `@Composable
fun ProfileScreen() {
    Box(Modifier.fillMaxSize().safeDrawingPadding()) {
        Profile()
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both keep content clear of device UI, but React Native commonly reads safe-area values from a provider while Compose models system, cutout, and IME insets as layout-aware window inset modifiers.",
    },
  ],
  mentalModel:
    "Treat insets as a screen-layout decision, not permanent global padding. Let decorative content draw edge-to-edge where intended, then apply safe insets only to controls, scrolling content, and text that must remain reachable.",
  differences: [
    "React Native SafeAreaView is deprecated in favor of react-native-safe-area-context; Compose offers typed WindowInsets and convenience modifiers.",
    "Compose inset padding modifiers consume the portion they apply so nested inset-aware modifiers avoid adding the same space twice.",
  ],
  commonMistakes: [
    "Applying fixed status-bar or keyboard padding everywhere, then double-padding a Scaffold or hiding the final input behind the IME.",
  ],
  productionNotes: [
    "Test gesture navigation, display cutouts, landscape, IME open/close, and nested Scaffold or navigation chrome on physical devices.",
  ],
} as const;
