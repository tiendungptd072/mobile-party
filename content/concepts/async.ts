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
      summary:
        "Loads one user, rejects failed HTTP responses, and forwards the owner's AbortSignal.",
      language: "typescript",
      filename: "load-user.ts",
    },
    kotlin: {
      name: "Coroutine + suspend",
      summary:
        "Loads the same user through Retrofit, propagating HTTP failures and caller cancellation.",
      language: "kotlin",
      filename: "UserRepository.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Both load the same user and propagate HTTP or transport failures. Fetch needs an explicit AbortSignal; Retrofit's suspend call follows its caller's coroutine cancellation. A Promise alone has no structured scope.",
    },
  ],
  mentalModel:
    "A suspend function resembles an async function at the call site, but its lifetime belongs to a coroutine scope rather than to the promise alone.",
  differences: [
    "Pass the owning effect's AbortSignal to fetch; call the suspend function from LaunchedEffect or viewModelScope so its lifetime has an owner.",
    "Kotlin dispatchers make execution context explicit when it must change.",
  ],
  commonMistakes: [
    "Launching unscoped coroutines as a direct replacement for creating promises.",
  ],
  productionNotes: [
    "Use an absolute configured HTTPS base URL in React Native. Both examples assume the same valid User JSON contract; let callers handle failures, suppress aborted UI updates, and rethrow CancellationException in Kotlin.",
  ],
} as const;
