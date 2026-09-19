package dev.mobileparty.sample

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

private const val FEED_ROUTE = "feed"
private const val DETAIL_ROUTE = "detail/{postId}"

@Composable
fun MobilePartySample(
    appViewModel: AppViewModel = viewModel(),
    navController: NavHostController = rememberNavController(),
) {
    val uiState by appViewModel.uiState.collectAsStateWithLifecycle()

    MaterialTheme {
        NavHost(navController = navController, startDestination = FEED_ROUTE) {
            composable(FEED_ROUTE) {
                FeedScreen(
                    posts = uiState.posts,
                    onPostSelected = { postId ->
                        navController.navigate("detail/$postId")
                    },
                )
            }
            composable(DETAIL_ROUTE) { entry ->
                val postId = entry.arguments?.getString("postId")?.toIntOrNull()
                val post = uiState.posts.firstOrNull { it.id == postId }
                DetailScreen(
                    post = post,
                    onBookmarkChanged = appViewModel::toggleBookmark,
                    onBack = navController::popBackStack,
                )
            }
        }
    }
}

@Composable
@OptIn(ExperimentalMaterial3Api::class)
private fun FeedScreen(
    posts: List<Post>,
    onPostSelected: (Int) -> Unit,
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Mobile Party checkpoint 1") }) },
    ) { padding ->
        LazyColumn(
            contentPadding = PaddingValues(16.dp),
            modifier = Modifier.padding(padding),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            items(posts, key = Post::id) { post ->
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .semantics { contentDescription = "Open ${post.title}" }
                        .clickable { onPostSelected(post.id) }
                        .padding(16.dp),
                ) {
                    Text(post.title, fontWeight = FontWeight.Bold)
                    Text(post.summary)
                    Text(if (post.isBookmarked) "Bookmarked" else "Not bookmarked")
                }
            }
        }
    }
}

@Composable
@OptIn(ExperimentalMaterial3Api::class)
private fun DetailScreen(
    post: Post?,
    onBookmarkChanged: (Int) -> Unit,
    onBack: () -> Unit,
) {
    if (post == null) {
        MissingPostScreen(onBack = onBack)
        return
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("Post detail") }) },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text(post.title, style = MaterialTheme.typography.headlineMedium)
            Text(post.summary)
            Button(onClick = { onBookmarkChanged(post.id) }) {
                Text(if (post.isBookmarked) "Remove bookmark" else "Bookmark")
            }
            Button(onClick = onBack) {
                Text("Back to feed")
            }
        }
    }
}

@Composable
private fun MissingPostScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text("Post unavailable", style = MaterialTheme.typography.headlineMedium)
        Button(onClick = onBack) {
            Text("Back to feed")
        }
    }
}
