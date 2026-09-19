export const nullSafetyConcept = {
  id: "null-safety",
  slug: "null-safety",
  title: "Null Safety",
  description:
    "Translate TypeScript nullable unions and optional chaining into Kotlin nullable types, safe calls, and explicit fallback behavior.",
  category: "fundamentals",
  order: 1,
  aliases: [
    "strictNullChecks",
    "optional chaining",
    "safe call",
    "Elvis operator",
  ],
  keywords: ["null", "undefined", "nullable", "?.", "?:", "smart cast"],
  implementations: {
    "react-native": {
      name: "Nullable union",
      summary:
        "A union and optional chaining make absence explicit under strictNullChecks.",
      language: "typescript",
      filename: "display-name.ts",
      code: `function displayName(user: User | null): string {
  return user?.profile?.name ?? "Guest";
}`,
    },
    kotlin: {
      name: "Nullable type",
      summary:
        "A question mark, safe calls, and the Elvis operator handle absence explicitly.",
      language: "kotlin",
      filename: "DisplayName.kt",
      code: `fun displayName(user: User?): String {
    return user?.profile?.name ?: "Guest"
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both type systems can represent absence explicitly, but Kotlin distinguishes nullable and non-null types throughout the language and Java interop adds platform types.",
    },
  ],
  mentalModel:
    "Map T | null | undefined to T? only after deciding what absence means. Prefer safe calls, early returns, and explicit defaults; do not translate TypeScript non-null assertions into Kotlin !! mechanically.",
  differences: [
    "Kotlin has one null value while JavaScript distinguishes null and undefined.",
    "Kotlin smart casts a checked value when the compiler can prove it has not changed.",
  ],
  commonMistakes: [
    "Using !! to silence the compiler instead of modeling an optional value or validating it at the boundary.",
  ],
  productionNotes: [
    "Normalize missing network and persistence fields at repository boundaries so UI state exposes deliberate nullable contracts.",
  ],
} as const;
