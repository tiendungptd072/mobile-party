package snippets.local_state.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
// #region show
@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Button(onClick = onIncrement) { Text("Count: $count") }
}

@Composable
fun CounterScreen() {
    var count by rememberSaveable { mutableIntStateOf(0) }
    Counter(count, onIncrement = { count++ })
}
// #endregion
