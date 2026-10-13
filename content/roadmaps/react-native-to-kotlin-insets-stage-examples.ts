export const insetStageExamples = {
  "window-insets": {
    basic: {
      "react-native": {
        name: "Pad a top control for the safe area",
        summary:
          "Read the top safe-area value only where the control needs it.",
        language: "tsx",
        filename: "Header.tsx",
        snippet: "window-insets/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Pad controls for safe drawing",
        summary:
          "Use a layout-aware modifier instead of hard-coded system-bar height.",
        language: "kotlin",
        filename: "Header.kt",
        snippet: "window-insets/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Keep the composer above the keyboard",
        summary:
          "KeyboardAvoidingView adjusts the composer while it is visible.",
        language: "tsx",
        filename: "Composer.tsx",
        snippet: "window-insets/react-native/applied.tsx",
      },
      kotlin: {
        name: "Resize for the IME",
        summary: "imePadding changes layout as the keyboard inset animates.",
        language: "kotlin",
        filename: "Composer.kt",
        snippet: "window-insets/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Apply insets at screen boundaries",
        summary:
          "Navigation chrome owns its own insets; the screen only pads its scrollable content.",
        language: "tsx",
        filename: "FeedScreen.tsx",
        snippet: "window-insets/react-native/production.tsx",
      },
      kotlin: {
        name: "Forward Scaffold content padding",
        summary:
          "Use Scaffold-provided content padding once instead of adding system-bar padding again.",
        language: "kotlin",
        filename: "FeedScreen.kt",
        snippet: "window-insets/kotlin/production.kt",
      },
    },
  },
} as const;
