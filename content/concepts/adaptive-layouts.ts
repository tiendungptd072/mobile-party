export const adaptiveLayoutsConcept = {
  id: "adaptive-layouts",
  slug: "adaptive-layouts",
  title: "Adaptive Layouts and Window Size",
  description:
    "Adapt a screen to its available window width for split-screen, tablets, foldables, and resized windows without tying UI decisions to device names.",
  category: "layout",
  order: 25.7,
  aliases: [
    "useWindowDimensions",
    "window size class",
    "tablet layout",
    "two pane",
  ],
  keywords: ["adaptive", "responsive", "window", "foldable", "tablet"],
  implementations: {
    "react-native": {
      name: "React to window dimensions",
      summary:
        "Choose a layout from the current window width, which updates on resize.",
      language: "tsx",
      filename: "MailScreen.tsx",
      code: `function MailScreen() {
  const { width } = useWindowDimensions();
  return width >= 600 ? <TwoPaneMail /> : <SinglePaneMail />;
}`,
    },
    kotlin: {
      name: "React to window size class",
      summary:
        "Choose a high-level layout from the current available window size.",
      language: "kotlin",
      filename: "MailScreen.kt",
      code: `@Composable
fun MailScreen() {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        TwoPaneMail()
    } else {
        SinglePaneMail()
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
        "Both react to the current app window rather than a fixed device model, but Compose window size classes provide shared breakpoint vocabulary for high-level layout decisions.",
    },
  ],
  mentalModel:
    "Adapt to available window space, not isTablet checks. Keep the content and state model stable, then select a one-pane or two-pane layout at a high boundary and pass the resulting layout intent down.",
  differences: [
    "useWindowDimensions returns raw current window values; Compose classifies available width and height into size classes that can change during the app lifetime.",
    "Window size class is not a device identity: split-screen, rotation, and folding can change it on the same device.",
  ],
  commonMistakes: [
    "Branching deeply on one width check across many child components, leaving panes with different state owners or navigation behavior.",
  ],
  productionNotes: [
    "Test compact, medium, and expanded widths plus compact height; preserve selection and navigation state while a pane appears or disappears.",
  ],
} as const;
