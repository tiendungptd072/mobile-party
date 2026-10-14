package snippets.error_handling.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface ProfileUiState { data class Ready(val profile: Profile) : ProfileUiState; data class Error(val error: ProfileError) : ProfileUiState }; fun Throwable.toProfileError() = ProfileError.Unknown
