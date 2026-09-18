export const secureStorageConcept = {
  id: "secure-storage",
  slug: "secure-storage",
  title: "Secure Storage",
  category: "storage",
  order: 61,
  description:
    "Store credentials through platform-backed secure storage rather than a general key-value preference store.",
  aliases: ["Keychain", "Keystore", "encrypted storage", "credential storage"],
  keywords: ["secret", "token", "encryption", "keystore", "keychain"],
  implementations: {
    "react-native": {
      name: "react-native-keychain",
      summary:
        "A native Keychain or Keystore wrapper persists credentials behind an async API.",
      language: "typescript",
      filename: "credentials.ts",
      code: `await Keychain.setGenericPassword("session", refreshToken);

export async function loadRefreshToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
}`,
    },
    kotlin: {
      name: "Android Keystore-backed storage",
      summary:
        "A storage abstraction encrypts data with a key held by Android Keystore.",
      language: "kotlin",
      filename: "SessionStore.kt",
      code: `interface SessionStore {
  suspend fun saveRefreshToken(token: String)
  suspend fun readRefreshToken(): String?
  suspend fun clear()
}

// The implementation encrypts values using an Android Keystore key.`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both delegate key protection to platform security facilities through an asynchronous storage boundary.",
    },
  ],
  mentalModel:
    "Secure storage reduces exposure of a persisted secret; it does not make an untrusted client a trusted authority or replace server-side authorization.",
  differences: [
    "React Native commonly uses a cross-platform native wrapper.",
    "Android implementations must choose an appropriate Keystore-backed encryption strategy and device-authentication policy.",
  ],
  commonMistakes: [
    "Putting access tokens in ordinary AsyncStorage or logging credentials while debugging.",
  ],
  productionNotes: [
    "Keep the storage API small, clear secrets on sign-out, handle invalidated keys, and never treat client storage as proof of identity.",
  ],
} as const;
