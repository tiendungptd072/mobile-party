package snippets.snapshot_state.production

import verification.support.*
import androidx.compose.runtime.*
// #region show
class TagState {
    private val editable = mutableStateListOf<String>()
    val tags: List<String> get() = editable.toList()
    fun add(tag: String) { editable.add(tag) }
}

@Composable
fun TagScreen(state: TagState = remember { TagState() }) {
    TagEditor(tags = state.tags, onAdd = state::add)
}
// #endregion
