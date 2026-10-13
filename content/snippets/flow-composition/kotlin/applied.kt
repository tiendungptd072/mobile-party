package snippets.flow_composition.applied

// #region show
val uiState = repository.visiblePosts
    .map<List<Post>, FeedUiState> { FeedUiState.Ready(it) }
    .retryWhen { error, attempt -> error is IOException && attempt < 2 }
    .catch { error ->
        if (error is IOException) emit(FeedUiState.Error)
        else throw error
    }
// #endregion
