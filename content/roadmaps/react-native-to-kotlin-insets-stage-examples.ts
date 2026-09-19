export const insetStageExamples = {
  "window-insets": {
    basic: {
      "react-native": {
        name: "Pad a top control for the safe area",
        summary:
          "Read the top safe-area value only where the control needs it.",
        language: "tsx",
        filename: "Header.tsx",
        code: `function Header() {
  const insets = useSafeAreaInsets();
  return <View style={{ paddingTop: insets.top }}><HeaderActions /></View>;
}`,
      },
      kotlin: {
        name: "Pad controls for safe drawing",
        summary:
          "Use a layout-aware modifier instead of hard-coded system-bar height.",
        language: "kotlin",
        filename: "Header.kt",
        code: `Box(Modifier.fillMaxWidth().safeDrawingPadding()) {
    HeaderActions()
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Keep the composer above the keyboard",
        summary:
          "KeyboardAvoidingView adjusts the composer while it is visible.",
        language: "tsx",
        filename: "Composer.tsx",
        code: `<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
  <MessageList />
  <TextInput placeholder="Message" />
</KeyboardAvoidingView>`,
      },
      kotlin: {
        name: "Resize for the IME",
        summary: "imePadding changes layout as the keyboard inset animates.",
        language: "kotlin",
        filename: "Composer.kt",
        code: `Column(Modifier.fillMaxSize().imePadding()) {
    MessageList(Modifier.weight(1f))
    TextField(value = draft, onValueChange = onDraftChange)
}`,
      },
    },
    production: {
      "react-native": {
        name: "Apply insets at screen boundaries",
        summary:
          "Navigation chrome owns its own insets; the screen only pads its scrollable content.",
        language: "tsx",
        filename: "FeedScreen.tsx",
        code: `function FeedScreen() {
  const insets = useSafeAreaInsets();
  return <FlatList contentContainerStyle={{ paddingBottom: insets.bottom }} data={posts} />;
}`,
      },
      kotlin: {
        name: "Forward Scaffold content padding",
        summary:
          "Use Scaffold-provided content padding once instead of adding system-bar padding again.",
        language: "kotlin",
        filename: "FeedScreen.kt",
        code: `@Composable
fun FeedScreen(posts: List<Post>) {
    Scaffold(topBar = { TopAppBar(title = { Text("Feed") }) }) { contentPadding ->
        LazyColumn(contentPadding = contentPadding) {
            items(posts, key = Post::id) { post -> PostRow(post) }
        }
    }
}`,
      },
    },
  },
} as const;
