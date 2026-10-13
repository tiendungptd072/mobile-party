package snippets.gesture_abstractions.production

// #region show
Box(
    Modifier.pointerInput(onDrag, onDrop) {
        detectDragGesturesAfterLongPress(
            onDrag = { change, dragAmount ->
                change.consume()
                onDrag(dragAmount)
            },
            onDragEnd = onDrop,
        )
    },
)
// #endregion
