package snippets.snapshot_state.applied

// #region show
@Composable
fun Tags() {
    val tags = remember { mutableStateListOf("one", "two") }
    Column {
        tags.forEach { tag ->
            key(tag) { TextButton(onClick = { tags.remove(tag) }) { Text(tag) } }
        }
    }
}
// #endregion
