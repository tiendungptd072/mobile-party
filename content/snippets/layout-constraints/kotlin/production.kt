package snippets.layout_constraints.production

// #region show
Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.TopCenter) {
    Box(Modifier.widthIn(max = 480.dp).fillMaxWidth()) {
        ProfileContent()
    }
}
// #endregion
