export const listConcept = {
  id: "list",
  slug: "list",
  title: "List",
  description:
    "Compare virtualized lists with React Native FlatList and Compose LazyColumn.",
  category: "lists",
  order: 30,
  aliases: ["FlatList", "LazyColumn", "virtualized list"],
  keywords: ["list", "collection", "scroll", "item key"],
  implementations: {
    "react-native": {
      name: "FlatList",
      summary: "Virtualizes rows from an array and a renderItem callback.",
      language: "tsx",
      filename: "UserList.tsx",
      code: `<FlatList
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => <UserRow user={item} />}
/>`,
    },
    kotlin: {
      name: "LazyColumn",
      summary: "Composes visible items through a lazy list scope.",
      language: "kotlin",
      filename: "UserList.kt",
      code: `LazyColumn {
    items(
        items = users,
        key = { user -> user.id },
    ) { user ->
        UserRow(user = user)
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both lazily render scrolling collections, while their item DSLs and layout engines differ.",
    },
  ],
  mentalModel:
    "Map FlatList configuration to a LazyColumn content DSL, while preserving stable keys and keeping row work inexpensive.",
  differences: [
    "LazyColumn builds content through a receiver scope instead of renderItem props.",
    "Tuning and measurement APIs differ between the native list implementations.",
  ],
  commonMistakes: [
    "Omitting stable keys when item identity must survive reordering.",
  ],
  productionNotes: [
    "Use immutable item models and stable keys; move expensive transformations outside row composition.",
  ],
} as const;
