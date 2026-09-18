export const themeConcept = {
  id: "theme",
  slug: "theme",
  title: "Theme",
  category: "architecture",
  order: 63,
  description:
    "Provide color, typography, and dark-mode choices through a shared design system rather than scattered literal values.",
  aliases: ["dark mode", "ColorScheme", "ThemeProvider", "MaterialTheme"],
  keywords: ["theme", "color", "typography", "dark", "design tokens"],
  implementations: {
    "react-native": {
      name: "Theme context",
      summary:
        "A provider exposes semantic tokens selected from a persisted appearance preference.",
      language: "typescript",
      filename: "app-theme.tsx",
      code: `const theme = scheme === "dark" ? darkTheme : lightTheme;

<ThemeContext.Provider value={theme}>
  <AppNavigator />
</ThemeContext.Provider>`,
    },
    kotlin: {
      name: "MaterialTheme",
      summary:
        "A root composable applies a ColorScheme and typography to its subtree.",
      language: "kotlin",
      filename: "AppTheme.kt",
      code: `@Composable
fun AppTheme(darkTheme: Boolean, content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = if (darkTheme) darkColorScheme() else lightColorScheme(),
    content = content,
  )
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both provide semantic design tokens from the app root so screens render consistently in each appearance mode.",
    },
  ],
  mentalModel:
    "A theme is data flowing down the UI tree. Components should ask for semantic roles such as surface or onSurface, not choose raw colors themselves.",
  differences: [
    "React Native teams define or import a token system and distribute it through Context.",
    "Compose MaterialTheme makes color, typography, and shapes ambient values in composition.",
  ],
  commonMistakes: [
    "Persisting a theme preference without respecting system appearance, or hard-coding colors that fail in dark mode.",
  ],
  productionNotes: [
    "Use semantic tokens, support system/default preference, test contrast, and update appearance without a visible flash on launch.",
  ],
} as const;
