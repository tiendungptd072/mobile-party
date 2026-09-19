export const genericsConcept = {
  id: "generics",
  slug: "generics",
  title: "Generics and Variance",
  description:
    "Compare reusable TypeScript generic contracts with Kotlin generics, constraints, and declaration-site variance.",
  category: "fundamentals",
  order: 7,
  aliases: ["generic type", "type parameter", "variance", "out", "in"],
  keywords: ["generics", "constraint", "variance", "covariance", "reified"],
  implementations: {
    "react-native": {
      name: "Generic result",
      summary:
        "A type parameter preserves the success payload across a reusable result contract.",
      language: "typescript",
      filename: "result.ts",
      code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };`,
    },
    kotlin: {
      name: "Covariant generic result",
      summary:
        "A covariant type parameter lets failure carry no success value while preserving type safety.",
      language: "kotlin",
      filename: "AppResult.kt",
      code: `sealed interface AppResult<out T> {
    data class Success<T>(val value: T) : AppResult<T>
    data class Failure(val error: AppError) : AppResult<Nothing>
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both preserve relationships between input and output types, while Kotlin uses nominal types and explicit in/out variance rules.",
    },
  ],
  mentalModel:
    "Translate the type relationship, not only the angle-bracket syntax. Add constraints when code needs a capability, and use out for producers or in for consumers only when the API contract supports it.",
  differences: [
    "TypeScript is structurally typed; Kotlin generic classes and interfaces are nominally typed.",
    "Kotlin supports declaration-site variance and reified type parameters on inline functions.",
  ],
  commonMistakes: [
    "Adding star projections or unsafe casts before understanding whether the generic API consumes, produces, or both consumes and produces T.",
  ],
  productionNotes: [
    "Prefer small domain-specific generic contracts over deeply nested wrappers that make success, absence, and failure difficult to distinguish.",
  ],
} as const;
