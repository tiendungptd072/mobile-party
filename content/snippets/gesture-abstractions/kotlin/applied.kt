package snippets.gesture_abstractions.applied

import verification.support.*
import androidx.compose.foundation.gestures.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.*
import kotlin.math.roundToInt
@Composable fun VerificationSnippet() {
// #region show
var offset by remember { mutableFloatStateOf(0f) }
Box(
    Modifier
        .offset { IntOffset(offset.roundToInt(), 0) }
        .draggable(
            state = rememberDraggableState { delta -> offset += delta },
            orientation = Orientation.Horizontal,
        ),
) { SwipeRowContent() }
// #endregion

}
