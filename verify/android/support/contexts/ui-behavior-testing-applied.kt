package snippets.ui_behavior_testing.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface ProfileUiState { data object Error : ProfileUiState }; @Composable fun ProfileScreen(state: ProfileUiState, onRetry: () -> Unit) = Unit
