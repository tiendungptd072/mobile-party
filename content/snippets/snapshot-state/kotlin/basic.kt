package snippets.snapshot_state.basic

// #region show
@Composable
fun Tags() {
    val tags = remember { mutableStateListOf<String>() }
    Button(onClick = { tags.add("new") }) {
        Text(tags.size.toString())
    }
}
// #endregion
