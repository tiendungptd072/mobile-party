export const dependencyInjectionConcept = {
  id: "dependency-injection",
  slug: "dependency-injection",
  title: "Dependency Injection and Lifetime",
  description:
    "Provide dependencies from an explicit composition root, then scope only mutable or expensive shared objects to the lifetime they need.",
  category: "architecture",
  order: 45.5,
  aliases: ["constructor injection", "Hilt", "composition root"],
  keywords: ["dependency injection", "Hilt", "scope", "factory", "test double"],
  implementations: {
    "react-native": {
      name: "Compose dependencies at the app root",
      summary:
        "The root builds production services and passes narrow contracts to routes or providers.",
      language: "tsx",
      filename: "AppRoot.tsx",
      code: `const repository = new HttpProfileRepository(apiClient);

export function AppRoot() {
  return <ProfileRoute repository={repository} />;
}`,
    },
    kotlin: {
      name: "Constructor-inject ViewModel dependencies",
      summary:
        "Hilt creates the ViewModel and supplies its repository from the dependency graph.",
      language: "kotlin",
      filename: "ProfileViewModel.kt",
      code: `@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val repository: ProfileRepository,
) : ViewModel()

@Composable
fun ProfileRoute(viewModel: ProfileViewModel = hiltViewModel()) { /* render */ }`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both assemble object graphs outside reusable UI. React commonly uses module exports, root props, or Context; Android can use manual constructor wiring in small apps or Hilt for a larger graph and Android component integration.",
    },
  ],
  mentalModel:
    "Dependencies flow inward through constructors; events and data flow outward through contracts. Scope an object only when it owns mutable shared state or is expensive to create. A DI framework organizes construction—it does not replace architecture boundaries.",
  differences: [
    "React Context distributes values through a UI subtree; it is not automatically a lifecycle-aware dependency container.",
    "Hilt integrates with Android component lifetimes and supplies Hilt-supported ViewModels, while manual DI remains sufficient for small, understandable graphs.",
  ],
  commonMistakes: [
    "Using a service locator inside ViewModels or composables, hiding required dependencies and making tests brittle.",
    "Adding Hilt only to avoid writing two constructors, or scoping every dependency as a singleton.",
  ],
  productionNotes: [
    "Prefer constructor injection and interfaces at boundaries that need replacement in tests. Keep UI dependencies narrow and pass plain state/callbacks into reusable composables.",
    "Adopt Hilt when the graph needs Android integration, multiple ViewModels, WorkManager, or navigation-scoped ViewModels; otherwise make manual wiring explicit.",
  ],
} as const;
