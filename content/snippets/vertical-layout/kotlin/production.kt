package snippets.vertical_layout.production

// #region show
Column(Modifier.verticalScroll(rememberScrollState()).padding(16.dp)) {
    ProfileHeader()
    ProfileDetails()
}
// #endregion
