export const apiRequestConcept = {
  id: "api-request",
  slug: "api-request",
  title: "API Request",
  description:
    "Compare an Axios request with a Retrofit service and coroutine call.",
  category: "networking",
  order: 50,
  aliases: ["Axios", "fetch", "Retrofit", "OkHttp", "HTTP request"],
  keywords: ["networking", "REST", "HTTP", "serialization", "request"],
  implementations: {
    "react-native": {
      name: "Axios",
      summary:
        "A configured Axios client returns one user and forwards cancellation to the request.",
      language: "typescript",
      filename: "user-api.ts",
    },
    kotlin: {
      name: "Retrofit + OkHttp",
      summary:
        "A Retrofit suspend call returns the same user and inherits its caller's cancellation.",
      language: "kotlin",
      filename: "UserApi.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both GET the same user and propagate non-2xx HTTP and transport failures. Axios receives an AbortSignal; Retrofit's suspend call inherits coroutine cancellation. Retrofit declares endpoints with annotations rather than a general request client.",
    },
  ],
  mentalModel:
    "Translate a configured Axios instance into an OkHttp client plus Retrofit service interfaces, then keep request orchestration in a repository.",
  differences: [
    "Retrofit generates an implementation from annotated interfaces.",
    "Axios's User type parameter does not validate JSON at runtime; configure a Retrofit JSON converter and validate transport data at the repository boundary.",
  ],
  commonMistakes: [
    "Treating unsuccessful HTTP responses and transport exceptions as the same failure.",
  ],
  productionNotes: [
    "Keep service definitions thin and use the same configured HTTPS base URL and User JSON contract. Forward the owner's AbortSignal in React Native; call Retrofit from a lifecycle-owned coroutine and preserve cancellation when mapping errors.",
  ],
} as const;
