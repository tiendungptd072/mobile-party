export const animationStageExamples = {
  "state-driven-animation": {
    basic: {
      "react-native": {
        name: "Animate a favorite scale",
        summary:
          "A retained Animated.Value springs to the target for current state.",
        language: "tsx",
        filename: "FavoriteButton.tsx",
        code: `const scale = useRef(new Animated.Value(1)).current;
useEffect(() => {
  Animated.spring(scale, { toValue: isFavorite ? 1.2 : 1, useNativeDriver: true }).start();
}, [isFavorite, scale]);`,
      },
      kotlin: {
        name: "Animate a favorite scale",
        summary: "The animated scale is derived from current favorite state.",
        language: "kotlin",
        filename: "FavoriteButton.kt",
        code: `val scale by animateFloatAsState(
    targetValue = if (isFavorite) 1.2f else 1f,
    label = "favorite scale",
)
Icon(Icons.Default.Favorite, null, Modifier.scale(scale))`,
      },
    },
    applied: {
      "react-native": {
        name: "Animate a visible panel",
        summary: "The same explicit opacity value controls panel presence.",
        language: "tsx",
        filename: "Filters.tsx",
        code: `const opacity = useRef(new Animated.Value(0)).current;
useEffect(() => {
  Animated.timing(opacity, { toValue: showFilters ? 1 : 0, duration: 180, useNativeDriver: true }).start();
}, [showFilters, opacity]);

return showFilters ? <Animated.View style={{ opacity }}><Filters /></Animated.View> : null;`,
      },
      kotlin: {
        name: "Animate a visible panel",
        summary:
          "AnimatedVisibility manages entry and exit from the composed UI tree.",
        language: "kotlin",
        filename: "Filters.kt",
        code: `AnimatedVisibility(visible = showFilters) {
    Filters()
}`,
      },
    },
    production: {
      "react-native": {
        name: "Coordinate related visual targets",
        summary:
          "A shared expanded state drives the values that form one visual transition.",
        language: "tsx",
        filename: "ArticleCard.tsx",
        code: `const target = expanded ? 1 : 0;
Animated.parallel([
  Animated.timing(opacity, { toValue: target, duration: 180, useNativeDriver: true }),
  Animated.spring(scale, { toValue: expanded ? 1 : 0.96, useNativeDriver: true }),
]).start();`,
      },
      kotlin: {
        name: "Coordinate related visual targets",
        summary:
          "A transition keeps related animated properties tied to one expanded state.",
        language: "kotlin",
        filename: "ArticleCard.kt",
        code: `val transition = updateTransition(targetState = expanded, label = "article")
val alpha by transition.animateFloat(label = "alpha") { if (it) 1f else 0f }
val scale by transition.animateFloat(label = "scale") { if (it) 1f else 0.96f }
ArticleDetails(Modifier.graphicsLayer(alpha = alpha, scaleX = scale, scaleY = scale))`,
      },
    },
  },
} as const;
