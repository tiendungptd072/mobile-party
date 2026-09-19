export const layoutStageExamples = {
  "layout-constraints": {
    basic: {
      "react-native": {
        name: "Fixed-size preview",
        summary: "Give a preview an explicit logical width and height.",
        language: "tsx",
        filename: "Preview.tsx",
        code: `<View style={{ width: 160, height: 80, backgroundColor: "#dbeafe" }} />`,
      },
      kotlin: {
        name: "Preferred size within constraints",
        summary:
          "Request a size while still respecting the parent's constraints.",
        language: "kotlin",
        filename: "Preview.kt",
        code: `Box(Modifier.size(width = 160.dp, height = 80.dp).background(Color(0xFFDBEAFE)))`,
      },
    },
    applied: {
      "react-native": {
        name: "Stretch inside padding",
        summary: "Stretch the card within a padded parent.",
        language: "tsx",
        filename: "Card.tsx",
        code: `<View style={{ paddingHorizontal: 16 }}>
  <View style={{ alignSelf: "stretch", height: 80, backgroundColor: "#dbeafe" }} />
</View>`,
      },
      kotlin: {
        name: "Fill remaining width",
        summary:
          "The inner card receives width bounded by the parent's padding.",
        language: "kotlin",
        filename: "Card.kt",
        code: `Column(Modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
    Box(Modifier.fillMaxWidth().height(80.dp).background(Color(0xFFDBEAFE)))
}`,
      },
    },
    production: {
      "react-native": {
        name: "Center bounded content",
        summary:
          "Fill a narrow screen but cap the content width on larger screens.",
        language: "tsx",
        filename: "ProfilePage.tsx",
        code: `<View style={{ width: "100%", maxWidth: 480, alignSelf: "center" }}>
  <ProfileContent />
</View>`,
      },
      kotlin: {
        name: "Constrain before filling",
        summary: "Apply max-width bounds before filling the width they allow.",
        language: "kotlin",
        filename: "ProfilePage.kt",
        code: `Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.TopCenter) {
    Box(Modifier.widthIn(max = 480.dp).fillMaxWidth()) {
        ProfileContent()
    }
}`,
      },
    },
  },
} as const;
