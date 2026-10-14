package snippets.pagination.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
enum class AppendState { Idle, Loading, Error }; val state = FeedUiState(); @Composable fun AppendState(state: AppendState) = Unit
