package dev.mobileparty.sample

import org.junit.Assert.assertTrue
import org.junit.Test

class AppViewModelTest {
    @Test
    fun togglesBookmarkInCurrentState() {
        val viewModel = AppViewModel()
        val post = viewModel.uiState.value.posts.first()

        viewModel.toggleBookmark(post.id)

        assertTrue(viewModel.uiState.value.posts.first().isBookmarked)
    }
}
