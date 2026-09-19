export const gestureAbstractionsConcept = {
  id: "gesture-abstractions",
  slug: "gesture-abstractions",
  title: "Gesture Abstractions and Pointer Input",
  description:
    "Choose the highest-level gesture API that expresses the interaction when moving from React Native responders to Compose modifiers and pointer input.",
  category: "interaction",
  order: 34.7,
  aliases: ["PanResponder", "pointerInput", "draggable", "detectDragGestures"],
  keywords: ["gesture", "drag", "tap", "pointer", "touch"],
  implementations: {
    "react-native": {
      name: "Pressable interaction",
      summary:
        "A high-level control owns tap feedback and responder negotiation.",
      language: "tsx",
      filename: "ArchiveButton.tsx",
      code: `<Pressable onPress={onArchive} accessibilityRole="button">
  <Text>Archive</Text>
</Pressable>`,
    },
    kotlin: {
      name: "Button interaction",
      summary:
        "A standard Compose control includes gesture, focus, and accessibility behavior.",
      language: "kotlin",
      filename: "ArchiveButton.kt",
      code: `Button(onClick = onArchive) {
    Text("Archive")
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both offer high-level controls and lower-level input APIs, but React Native negotiates a responder lifecycle while Compose layers components, gesture modifiers, and raw pointerInput handlers with their own event consumption rules.",
    },
  ],
  mentalModel:
    "Start with a standard control, then a gesture modifier, and use pointerInput only for a genuinely custom gesture. Do not rebuild tapping with raw pointer events when the control also needs focus, keyboard support, visual feedback, and semantics.",
  differences: [
    "Compose Button and clickable include more interaction behavior than a raw pointerInput handler; custom pointer code must restore any required semantics deliberately.",
    "A pointerInput block is keyed: changing its key restarts the handler, and top-level gesture detectors should use separate blocks when they must run independently.",
  ],
  commonMistakes: [
    "Putting tap and drag detectors sequentially in one pointerInput block, where the first suspending detector prevents the next from running.",
  ],
  productionNotes: [
    "Test cancellation, nested scrolling, multi-touch, accessibility, and touch targets; use a maintained gesture library only when the product needs capabilities beyond platform gesture APIs.",
  ],
} as const;
