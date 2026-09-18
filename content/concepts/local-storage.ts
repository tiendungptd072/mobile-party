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
      code: `const themeKey = "theme";

export async function saveTheme(theme: "light" | "dark") {
  await AsyncStorage.setItem(themeKey, theme);
}

export function loadTheme() {
  return AsyncStorage.getItem(themeKey);
}`,
    },
    kotlin: {
      name: "Preferences DataStore",
      summary:
        "A typed Flow reads preferences reactively and an edit transaction writes updates.",
      language: "kotlin",
      filename: "ThemePreferences.kt",
      code: `val Context.dataStore by preferencesDataStore(name = "settings")
val themeKey = stringPreferencesKey("theme")

val Context.theme: Flow<String?>
  get() = dataStore.data.map { it[themeKey] }

suspend fun Context.saveTheme(theme: String) {
  dataStore.edit { it[themeKey] = theme }
}`,
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
