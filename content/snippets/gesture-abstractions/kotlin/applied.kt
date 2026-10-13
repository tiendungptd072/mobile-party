package snippets.gesture_abstractions.applied

// #region show
var offset by remember { mutableFloatStateOf(0f) }
Box(
    Modifier
        .offset { IntOffset(offset.roundToInt(), 0) }
        .draggable(orientation = Orientation.Horizontal) { delta -> offset += delta },
) { SwipeRowContent() }
// #endregion
