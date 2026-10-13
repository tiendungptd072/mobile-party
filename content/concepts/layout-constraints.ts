export const layoutConstraintsConcept = {
  id: "layout-constraints",
  slug: "layout-constraints",
  title: "Layout Constraints and Sizing",
  description:
    "Translate responsive React Native sizing into Compose's parent-to-child constraints and child-to-parent measurement model.",
  category: "layout",
  order: 25.5,
  aliases: ["Compose constraints", "widthIn", "fillMaxWidth", "maxWidth"],
  keywords: ["measurement", "constraints", "responsive", "size", "parent"],
  implementations: {
    "react-native": {
      name: "Stretch within a padded parent",
      summary: "A child stretches inside its parent's horizontal padding.",
      language: "tsx",
      filename: "Card.tsx",
    },
    kotlin: {
      name: "Fill the available width",
      summary: "The child fills the width available after parent padding.",
      language: "kotlin",
      filename: "Card.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can size a child against space provided by its parent, but Compose passes explicit min/max constraints down the layout tree rather than translating every flex or percentage style directly.",
    },
  ],
  mentalModel:
    "Ask which bounds the parent gives a child before choosing size, fillMaxWidth, or widthIn. A Compose child is measured within those bounds, reports its size, and is then placed by its parent.",
  differences: [
    "React Native expresses width, flex, and maxWidth through styles; Compose sizing modifiers transform the constraints passed toward the child.",
    "Modifier order matters: fillMaxWidth before widthIn can force an exact width that a later widthIn cannot reduce.",
  ],
  commonMistakes: [
    "Chaining fillMaxWidth().widthIn(max = ...) and expecting the later maximum to narrow an already exact width.",
  ],
  productionNotes: [
    "Test narrow and wide parent bounds, long text, and font scaling; use bounded max-width content when a tablet layout should not stretch indefinitely.",
  ],
} as const;
