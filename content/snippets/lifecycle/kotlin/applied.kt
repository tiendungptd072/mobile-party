package snippets.lifecycle.applied

// #region show
DisposableEffect(chat, roomId) {
    val connection = chat.connect(roomId).also { it.start() }
    onDispose { connection.stop() }
}
// #endregion
