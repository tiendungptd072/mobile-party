export const adaptiveStageExamples = {
  "adaptive-layouts": {
    basic: {
      "react-native": {
        name: "Choose layout from current width",
        summary: "The hook re-renders when the app window changes size.",
        language: "tsx",
        filename: "SettingsScreen.tsx",
        code: `function SettingsScreen() {
  const { width } = useWindowDimensions();
  return width >= 600 ? <SettingsGrid /> : <SettingsList />;
}`,
      },
      kotlin: {
        name: "Choose layout from size class",
        summary:
          "Use the available window class for a high-level layout decision.",
        language: "kotlin",
        filename: "SettingsScreen.kt",
        code: `@Composable
fun SettingsScreen() {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        SettingsGrid()
    } else {
        SettingsList()
    }
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Select one or two panes",
        summary: "Keep selected mail state outside the layout branch.",
        language: "tsx",
        filename: "MailScreen.tsx",
        code: `function MailScreen({ selectedId }: Props) {
  const { width } = useWindowDimensions();
  return width >= 600
    ? <TwoPaneMail selectedId={selectedId} />
    : <SinglePaneMail selectedId={selectedId} />;
}`,
      },
      kotlin: {
        name: "Select one or two panes",
        summary:
          "Pass selection into either layout instead of creating separate owners.",
        language: "kotlin",
        filename: "MailScreen.kt",
        code: `@Composable
fun MailScreen(selectedId: String?) {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        TwoPaneMail(selectedId)
    } else {
        SinglePaneMail(selectedId)
    }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Keep navigation state across resize",
        summary:
          "The route owns selection while the visible pane arrangement changes.",
        language: "tsx",
        filename: "MailRoute.tsx",
        code: `function MailRoute() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return <MailScreen selectedId={selectedId} onSelect={setSelectedId} />;
}`,
      },
      kotlin: {
        name: "Keep navigation state across resize",
        summary:
          "The ViewModel owns selection while the composable changes its pane arrangement.",
        language: "kotlin",
        filename: "MailRoute.kt",
        code: `@Composable
fun MailRoute(viewModel: MailViewModel = viewModel()) {
    val selectedId by viewModel.selectedId.collectAsStateWithLifecycle()
    MailScreen(selectedId = selectedId)
}`,
      },
    },
  },
} as const;
