export const extensionFunctionsConcept = {
  id: "extension-functions",
  slug: "extension-functions",
  title: "Extension Functions",
  description:
    "Translate TypeScript utility functions into focused Kotlin extensions without hiding ownership, I/O, or expensive work.",
  category: "fundamentals",
  order: 6,
  aliases: ["extension function", "utility function", "extension property"],
  keywords: ["extension", "utility", "receiver", "mapping", "API design"],
  implementations: {
    "react-native": {
      name: "Utility function",
      summary:
        "A plain function transforms a domain value without changing its runtime prototype.",
      language: "typescript",
      filename: "user-display.ts",
      code: `function displayName(user: User): string {
  return user.nickname?.trim() || user.name;
}`,
    },
    kotlin: {
      name: "Extension function",
      summary:
        "An extension adds call-site syntax without modifying or subclassing the receiver type.",
      language: "kotlin",
      filename: "UserDisplay.kt",
      code: `fun User.displayName(): String {
    return nickname?.trim().takeUnless { it.isNullOrEmpty() } ?: name
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "A Kotlin extension remains a statically resolved function; it does not add a real member or mutate the receiver prototype.",
    },
  ],
  mentalModel:
    "Think of an extension as a namespaced utility with receiver-style syntax. Use it for cohesive pure behavior, not to make hidden network, storage, or lifecycle work look like a cheap property access.",
  differences: [
    "Extensions are resolved statically from the declared receiver type.",
    "An actual member function always takes precedence over an extension with the same signature.",
  ],
  commonMistakes: [
    "Creating broad extensions on Any, Context, or nullable types that hide dependencies and make behavior difficult to discover.",
  ],
  productionNotes: [
    "Keep extensions close to the domain they clarify and test mapping extensions as ordinary pure functions.",
  ],
} as const;
