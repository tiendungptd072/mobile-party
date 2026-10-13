export const gestureStageExamples = {
  "gesture-abstractions": {
    basic: {
      "react-native": {
        name: "Use a high-level action control",
        summary:
          "Pressable provides a tap interaction without manual responder handling.",
        language: "tsx",
        filename: "ArchiveButton.tsx",
        snippet: "gesture-abstractions/react-native/basic.tsx",
      },
      kotlin: {
        name: "Use a high-level action control",
        summary:
          "Button retains built-in click, focus, and accessibility behavior.",
        language: "kotlin",
        filename: "ArchiveButton.kt",
        snippet: "gesture-abstractions/kotlin/basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Track a horizontal drag",
        summary: "PanResponder converts move events into a UI-owned offset.",
        language: "tsx",
        filename: "SwipeRow.tsx",
        snippet: "gesture-abstractions/react-native/applied.tsx",
      },
      kotlin: {
        name: "Track a horizontal drag",
        summary:
          "draggable reports deltas while the screen owns the resulting offset.",
        language: "kotlin",
        filename: "SwipeRow.kt",
        snippet: "gesture-abstractions/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Long-press drag behavior",
        summary:
          "The responder claims input only when the custom interaction begins.",
        language: "tsx",
        filename: "ReorderHandle.tsx",
        snippet: "gesture-abstractions/react-native/production.tsx",
      },
      kotlin: {
        name: "Long-press drag behavior",
        summary:
          "Use a specific detector when the interaction is not available as a standard modifier.",
        language: "kotlin",
        filename: "ReorderHandle.kt",
        snippet: "gesture-abstractions/kotlin/production.kt",
      },
    },
  },
} as const;
