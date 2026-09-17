export const asyncConcept = {
  id: "async",
  slug: "async",
  title: "Async Work",
  description: "Compare JavaScript promises with structured Kotlin coroutines.",
  category: "async",
  order: 40,
  aliases: ["Promise", "async await", "Coroutine", "suspend"],
  keywords: ["async", "concurrency", "cancellation", "coroutine scope"],
  implementations: {
    "react-native": {
      name: "Promise + async/await",
      summary: "Awaits a promise and handles failure with normal control flow.",
      language: "typescript",
      filename: "load-user.ts",
      code: `async function loadUser(id: string) {
  const response = await fetch(\`/users/\${id}\`);

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return response.json();
}`,
    },
    kotlin: {
      name: "Coroutine + suspend",
      summary: "Runs suspending work inside an owning coroutine scope.",
      language: "kotlin",
      filename: "UserRepository.kt",
      code: `suspend fun loadUser(id: String): User {
    return userApi.getUser(id)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both express asynchronous work, but coroutines add structured scopes, dispatchers, and cooperative cancellation.",
    },
  ],
  mentalModel:
    "A suspend function resembles an async function at the call site, but its lifetime belongs to a coroutine scope rather than to the promise alone.",
  differences: [
    "Coroutine scopes define ownership and cancellation.",
    "Kotlin dispatchers make execution context explicit when it must change.",
  ],
  commonMistakes: [
    "Launching unscoped coroutines as a direct replacement for creating promises.",
  ],
  productionNotes: [
    "Launch work from lifecycle-aware scopes and keep suspend functions cancellable.",
  ],
} as const;
