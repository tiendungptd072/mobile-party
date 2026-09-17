export const textInputConcept = {
  id: "text-input",
  slug: "text-input",
  title: "Text Input",
  description:
    "Keep a text field controlled by state in React Native and Jetpack Compose.",
  category: "interaction",
  order: 35,
  aliases: ["TextInput", "TextField", "controlled input"],
  keywords: ["form", "value", "onChangeText", "onValueChange"],
  implementations: {
    "react-native": {
      name: "Controlled TextInput",
      summary:
        "The rendered value and change handler are owned by component state.",
      language: "tsx",
      filename: "NameField.tsx",
      code: `<TextInput value={name} onChangeText={setName} placeholder="Name" />`,
    },
    kotlin: {
      name: "Controlled TextField",
      summary:
        "The value flows down and the change event requests a state update.",
      language: "kotlin",
      filename: "NameField.kt",
      code: `TextField(value = name, onValueChange = { name = it }, label = { Text("Name") })`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both inputs are controlled by a value and an event callback; the state owner decides the next value.",
    },
  ],
  mentalModel:
    "A field does not own canonical form state merely because it displays it. State flows down and edit events flow up.",
  differences: [
    "React Native names the callback onChangeText.",
    "Compose exposes onValueChange and supports state hoisting naturally.",
  ],
  commonMistakes: [
    "Passing a fixed value without updating it in the callback, making the input appear read-only.",
  ],
  productionNotes: [
    "Keep validation and submit state outside reusable field components.",
  ],
} as const;
