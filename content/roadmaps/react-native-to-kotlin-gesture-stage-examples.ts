export const gestureStageExamples = {
  "gesture-abstractions": {
    basic: {
      "react-native": {
        name: "Use a high-level action control",
        summary:
          "Pressable provides a tap interaction without manual responder handling.",
        language: "tsx",
        filename: "ArchiveButton.tsx",
        code: `<Pressable onPress={onArchive} accessibilityRole="button">
  <Text>Archive</Text>
</Pressable>`,
      },
      kotlin: {
        name: "Use a high-level action control",
        summary:
          "Button retains built-in click, focus, and accessibility behavior.",
        language: "kotlin",
        filename: "ArchiveButton.kt",
        code: `Button(onClick = onArchive) {
    Text("Archive")
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Track a horizontal drag",
        summary: "PanResponder converts move events into a UI-owned offset.",
        language: "tsx",
        filename: "SwipeRow.tsx",
        code: `const panResponder = useMemo(() => PanResponder.create({
  onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8,
  onPanResponderMove: (_, gesture) => setOffset(gesture.dx),
  onPanResponderRelease: () => setOffset(0),
}), []);`,
      },
      kotlin: {
        name: "Track a horizontal drag",
        summary:
          "draggable reports deltas while the screen owns the resulting offset.",
        language: "kotlin",
        filename: "SwipeRow.kt",
        code: `var offset by remember { mutableFloatStateOf(0f) }
Box(
    Modifier
        .offset { IntOffset(offset.roundToInt(), 0) }
        .draggable(orientation = Orientation.Horizontal) { delta -> offset += delta },
) { SwipeRowContent() }`,
      },
    },
    production: {
      "react-native": {
        name: "Long-press drag behavior",
        summary:
          "The responder claims input only when the custom interaction begins.",
        language: "tsx",
        filename: "ReorderHandle.tsx",
        code: `<View
  onStartShouldSetResponder={() => true}
  onResponderMove={(event) => onDrag(event.nativeEvent.locationY)}
  onResponderRelease={onDrop}
/>`,
      },
      kotlin: {
        name: "Long-press drag behavior",
        summary:
          "Use a specific detector when the interaction is not available as a standard modifier.",
        language: "kotlin",
        filename: "ReorderHandle.kt",
        code: `Box(
    Modifier.pointerInput(onDrag, onDrop) {
        detectDragGesturesAfterLongPress(
            onDrag = { change, dragAmount ->
                change.consume()
                onDrag(dragAmount)
            },
            onDragEnd = onDrop,
        )
    },
)`,
      },
    },
  },
} as const;
