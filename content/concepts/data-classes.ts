export const dataClassesConcept = {
  id: "data-classes",
  slug: "data-classes",
  title: "Immutable Models and Data Classes",
  description:
    "Compare readonly TypeScript object models with Kotlin data classes, value equality, destructuring, and copy-based updates.",
  category: "fundamentals",
  order: 2,
  aliases: ["data class", "readonly type", "copy", "value equality"],
  keywords: ["immutable model", "readonly", "data class", "copy", "equals"],
  implementations: {
    "react-native": {
      name: "Readonly object update",
      summary:
        "A readonly object is replaced with a new value using object spread.",
      language: "typescript",
      filename: "user.ts",
      code: `type User = Readonly<{ id: string; name: string }>;

const renamed: User = { ...user, name: "Linh" };`,
    },
    kotlin: {
      name: "Data class copy",
      summary: "A data class provides value equality and copy-based updates.",
      language: "kotlin",
      filename: "User.kt",
      code: `data class User(val id: String, val name: String)

val renamed = user.copy(name = "Linh")`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both patterns create replacement values for state updates, while Kotlin data classes additionally generate value equality, component functions, and copy.",
    },
  ],
  mentalModel:
    "Translate immutable TypeScript state objects into Kotlin data classes with val properties. Replace object spread with copy, then review nested collections because val does not make a mutable object deeply immutable.",
  differences: [
    "TypeScript readonly is a compile-time structural constraint; Kotlin val prevents reassignment of a property reference.",
    "Data classes use value equality, while JavaScript object equality remains reference-based.",
  ],
  commonMistakes: [
    "Assuming a val MutableList is immutable or comparing JavaScript objects as if they had data-class value equality.",
  ],
  productionNotes: [
    "Expose immutable collections in UI state and keep mutation inside the owning state holder or repository.",
  ],
} as const;
