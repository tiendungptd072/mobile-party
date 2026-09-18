export const gridConcept = {
  id: "grid",
  slug: "grid",
  title: "Grid",
  category: "lists",
  order: 31,
  description:
    "Render a scalable grid with FlatList columns or LazyVerticalGrid and stable item identity.",
  aliases: ["numColumns", "LazyVerticalGrid", "grid list"],
  keywords: ["grid", "collection", "columns", "key", "lazy"],
  implementations: {
    "react-native": {
      name: "FlatList columns",
      summary:
        "FlatList virtualizes a collection while numColumns controls the row layout.",
      language: "typescript",
      filename: "photo-grid.tsx",
      code: `<FlatList
  data={photos}
  numColumns={2}
  keyExtractor={(photo) => photo.id}
  renderItem={({ item }) => <PhotoTile photo={item} />}
/>`,
    },
    kotlin: {
      name: "LazyVerticalGrid",
      summary:
        "LazyVerticalGrid virtualizes cells and uses an adaptive or fixed column definition.",
      language: "kotlin",
      filename: "PhotoGrid.kt",
      code: `LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 160.dp)) {
  items(photos, key = { it.id }) { photo ->
    PhotoTile(photo)
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
        "Both virtualize a large collection and need stable keys; Compose has a dedicated lazy grid container.",
    },
  ],
  mentalModel:
    "A grid is still a lazy collection. Preserve identity, render one cell independently, and let the layout adapt to available width.",
  differences: [
    "FlatList adds columns to a list; Compose chooses a LazyVerticalGrid explicitly.",
    "Compose can use adaptive GridCells while React Native often calculates dimensions in styles.",
  ],
  commonMistakes: [
    "Using array indexes as keys or nesting an unbounded grid inside another vertical scroll container.",
  ],
  productionNotes: [
    "Define loading, empty, pagination, and image-sizing behavior before optimizing visual density.",
  ],
} as const;
