export const featureModuleBoundariesConcept = {
  id: "feature-module-boundaries",
  slug: "feature-module-boundaries",
  title: "Feature Module Boundaries",
  description:
    "Choose module boundaries around ownership and change, then keep feature code dependent on contracts rather than data implementations.",
  category: "architecture",
  order: 45.625,
  aliases: ["modularization", "feature modules", "dependency direction"],
  keywords: [
    "module",
    "package",
    "Gradle",
    "dependency inversion",
    "ownership",
  ],
  implementations: {
    "react-native": {
      name: "Expose a package contract",
      summary:
        "A feature package imports a small contract; the application supplies its implementation.",
      language: "tsx",
      filename: "packages/profile-contract/src/index.ts",
    },
    kotlin: {
      name: "Expose a Gradle module contract",
      summary:
        "A feature module depends on an API module, not on the database implementation.",
      language: "kotlin",
      filename: "core/profile-api/src/main/kotlin/ProfileReader.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can separate a feature from data implementation through a narrow contract. A TypeScript package boundary is not the same as an Android Gradle module: the latter also defines a build dependency and compile-time visibility boundary.",
    },
  ],
  mentalModel:
    "Do not translate every React Native folder into a Gradle module. First identify code with an independent owner or change cycle. Put the contract where both feature and implementation can depend on it; let the app assemble them.",
  differences: [
    "React Native JavaScript packages organize source and public exports; an Android Gradle module adds an explicit build edge and may produce an AAR.",
    "Android app modules normally depend on feature modules. A feature that needs a replaceable data source can depend on an API module while the app supplies the implementation.",
  ],
  commonMistakes: [
    "Creating a module for every screen before there is a stable ownership or reuse boundary.",
    "Making a feature depend on a concrete database module, then introducing a circular dependency when the database needs a feature type.",
  ],
  productionNotes: [
    "Draw the dependency graph before splitting code. Compare build time, public API size, test isolation, and ownership against the added Gradle and coordination cost.",
    "Prefer implementation dependencies. Expose a dependency with api only when downstream modules need its types in their public compile contract.",
  ],
} as const;
