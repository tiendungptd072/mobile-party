package snippets.state_restoration.applied

// #region show
@Composable
fun SearchDraft() {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(value = query, onValueChange = { query = it })
}
// #endregion
