export const localStorageConcept = {
  id: "local-storage",
  slug: "local-storage",
  title: "Local Storage",
  description:
    "Persist small app preferences and cached values with AsyncStorage or Android DataStore.",
  category: "storage",
  order: 60,
  aliases: ["AsyncStorage", "DataStore", "preferences", "persistence"],
  keywords: ["storage", "cache", "preference", "disk", "persistence"],
  implementations: {
    "react-native": {
      name: "AsyncStorage",
      summary:
        "A promise-based key-value store persists serialized values on the device.",
      language: "typescript",
      filename: "theme-storage.ts",
    },
    kotlin: {
      name: "Preferences DataStore",
      summary:
        "A typed Flow reads preferences reactively and an edit transaction writes updates.",
      language: "kotlin",
      filename: "ThemePreferences.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both persist key-value data, but AsyncStorage reads through promises while DataStore exposes updates as a Flow.",
    },
  ],
  mentalModel:
    "Storage is an asynchronous source of data. Read it through a repository or state holder; do not make render output depend on a synchronous disk read.",
  differences: [
    "AsyncStorage stores strings, so callers serialize values themselves.",
    "DataStore provides transactional edits and reactive observation through Flow.",
  ],
  commonMistakes: [
    "Persisting secrets in a general preference store or using storage as the only source of truth for screen state.",
  ],
  productionNotes: [
    "Version stored schemas, choose defaults deliberately, and treat malformed persisted data as recoverable input.",
  ],
} as const;
