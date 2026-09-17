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
      summary: "A JavaScript HTTP client returns a promise for decoded data.",
      language: "typescript",
      filename: "user-api.ts",
      code: `async function getUser(id: string): Promise<User> {
  const response = await api.get<User>(\`/users/\${id}\`);
  return response.data;
}`,
    },
    kotlin: {
      name: "Retrofit + OkHttp",
      summary: "A typed service interface delegates transport to OkHttp.",
      language: "kotlin",
      filename: "UserApi.kt",
      code: `interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both wrap HTTP calls, but Retrofit models endpoints as interfaces while Axios exposes a general request client.",
    },
  ],
  mentalModel:
    "Translate a configured Axios instance into an OkHttp client plus Retrofit service interfaces, then keep request orchestration in a repository.",
  differences: [
    "Retrofit generates an implementation from annotated interfaces.",
    "Serialization, interceptors, and error bodies require explicit Kotlin configuration.",
  ],
  commonMistakes: [
    "Treating unsuccessful HTTP responses and transport exceptions as the same failure.",
  ],
  productionNotes: [
    "Keep service definitions thin and map transport models at the repository boundary.",
  ],
} as const;
