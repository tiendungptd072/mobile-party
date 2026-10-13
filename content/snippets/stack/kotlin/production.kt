package snippets.stack.production

// #region show
Box {
    Image(painter, contentDescription = description)
    IconButton(onClick = onPlay, modifier = Modifier.align(Alignment.Center)) {
        Icon(Icons.Default.PlayArrow, contentDescription = "Play video")
    }
}
// #endregion
