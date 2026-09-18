export const buttonConcept = {
  id: "button",
  slug: "button",
  title: "Button",
  category: "interaction",
  order: 34,
  description:
    "Map press events, disabled state, and accessible labels between React Native and Compose buttons.",
  aliases: ["Pressable", "TouchableOpacity", "onClick"],
  keywords: ["press", "tap", "disabled", "accessibility", "event"],
  implementations: {
    "react-native": {
      name: "Pressable",
      summary: "A pressable control emits an event and exposes disabled state.",
      language: "typescript",
      filename: "save-button.tsx",
      code: `function SaveButton({ saving, onSave }: Props) {
  return <Pressable disabled={saving} onPress={onSave} accessibilityRole="button">
    <Text>{saving ? "Saving…" : "Save"}</Text>
  </Pressable>;
}`,
    },
    kotlin: {
      name: "Button",
      summary:
        "A composable button receives an onClick lambda and explicit enabled state.",
      language: "kotlin",
      filename: "SaveButton.kt",
      code: `@Composable
fun SaveButton(saving: Boolean, onSave: () -> Unit) {
  Button(onClick = onSave, enabled = !saving) {
    Text(if (saving) "Saving…" else "Save")
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
        "Both represent a user action as a callback and render availability from state.",
    },
  ],
  mentalModel:
    "A button describes an intent; the screen owner decides what happens after the press and whether the action is currently available.",
  differences: [
    "React Native often starts with Pressable for custom visuals; Compose offers Material button composables and Modifier.clickable.",
    "Compose semantics are inferred from standard controls, while custom clickable UI may need explicit semantics.",
  ],
  commonMistakes: [
    "Starting async work directly in a reusable button or leaving the action enabled while a non-idempotent request is running.",
  ],
  productionNotes: [
    "Provide a visible label, minimum touch target, disabled reason where useful, and an idempotent action contract.",
  ],
} as const;
