package snippets.gesture_abstractions.production

import verification.support.*
import androidx.compose.foundation.gestures.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.pointer.pointerInput
@Composable fun VerificationSnippet() {
val onDrag: (androidx.compose.ui.geometry.Offset) -> Unit = {}
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

}
