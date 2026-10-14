package snippets.loading_state.learn_basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface ProfileUiState { data object Loading : ProfileUiState; data class Ready(val profile: Profile) : ProfileUiState }
