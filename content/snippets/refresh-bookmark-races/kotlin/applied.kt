package snippets.refresh_bookmark_races.applied

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.flow.*
// #region show
sealed interface FeedEvent {
    data class Refreshed(val posts: List<Post>) : FeedEvent
    data class BookmarkToggled(val id: String) : FeedEvent
}

fun reduceFeed(state: FeedState, event: FeedEvent): FeedState = when (event) {
    is FeedEvent.Refreshed -> state.copy(posts = event.posts)
    is FeedEvent.BookmarkToggled -> state.copy(
        bookmarkedIds = if (event.id in state.bookmarkedIds)
            state.bookmarkedIds - event.id else state.bookmarkedIds + event.id,
    )
}

class FeedViewModel : ViewModel() {
    private val feed = MutableStateFlow(FeedState())

    fun dispatch(event: FeedEvent) {
        feed.update { current -> reduceFeed(current, event) }
    }
}
// #endregion
