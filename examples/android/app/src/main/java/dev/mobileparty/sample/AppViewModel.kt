package dev.mobileparty.sample

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

data class Post(
    val id: Int,
    val title: String,
    val summary: String,
    val isBookmarked: Boolean = false,
)

data class AppUiState(
    val posts: List<Post> = samplePosts,
)

class AppViewModel : ViewModel() {
    private val mutableUiState = MutableStateFlow(AppUiState())
    val uiState = mutableUiState.asStateFlow()

    fun toggleBookmark(postId: Int) {
        mutableUiState.update { state ->
            state.copy(
                posts = state.posts.map { post ->
                    if (post.id == postId) {
                        post.copy(isBookmarked = !post.isBookmarked)
                    } else {
                        post
                    }
                },
            )
        }
    }
}

private val samplePosts = listOf(
    Post(1, "Compose State", "Choose state owner before storing state."),
    Post(2, "Navigation", "Pass stable IDs through destinations."),
)
