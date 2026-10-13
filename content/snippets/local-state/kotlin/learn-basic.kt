package snippets.local_state.learn_basic

// #region show
@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
// #endregion
