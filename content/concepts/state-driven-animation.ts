export const stateDrivenAnimationConcept = {
  id: "state-driven-animation",
  slug: "state-driven-animation",
  title: "State-Driven Animation",
  description:
    "Translate imperative animated values into Compose animations whose target values are derived from current UI state.",
  category: "interaction",
  order: 34.6,
  aliases: [
    "Animated.Value",
    "animateFloatAsState",
    "AnimatedVisibility",
    "transition",
  ],
  keywords: ["animation", "motion", "transition", "visibility", "state"],
  implementations: {
    "react-native": {
      name: "Animate an explicit value",
      summary:
        "Animated.Value is retained and driven to a target when state changes.",
      language: "tsx",
      filename: "FavoriteButton.tsx",
      code: `const scale = useRef(new Animated.Value(1)).current;

useEffect(() => {
  Animated.spring(scale, { toValue: isFavorite ? 1.2 : 1, useNativeDriver: true }).start();
}, [isFavorite, scale]);`,
    },
    kotlin: {
      name: "Animate a state target",
      summary: "The animation follows a target derived from the current state.",
      language: "kotlin",
      filename: "FavoriteButton.kt",
      code: `val scale by animateFloatAsState(
    targetValue = if (isFavorite) 1.2f else 1f,
    label = "favorite scale",
)
Icon(Icons.Default.Favorite, null, Modifier.scale(scale))`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both animate values toward a target, but Compose animation APIs are commonly declared from the current target state instead of started from an effect for each ordinary visual state change.",
    },
  ],
  mentalModel:
    "Keep the business/UI state as the source of truth and animate the visual representation toward it. Choose one-value animation for a single property, AnimatedVisibility for presence, and a transition when several properties must share one state change.",
  differences: [
    "React Native Animated retains an explicit animated value and commonly starts timing or spring work; Compose animate*AsState derives an animated value during composition.",
    "Compose animation labels aid tooling; they are not user-facing content or stable test selectors.",
  ],
  commonMistakes: [
    "Storing an animation progress value as a second source of truth for whether content is expanded or selected.",
  ],
  productionNotes: [
    "Respect reduced-motion requirements, keep animation independent of business correctness, and profile complex list or gesture motion on target devices.",
  ],
} as const;
