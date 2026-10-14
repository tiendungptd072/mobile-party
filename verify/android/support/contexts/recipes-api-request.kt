package snippets.recipes.api_request
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface ProfileState { data object Loading : ProfileState; data class Success(val profile: Profile) : ProfileState; data class Error(val message: String) : ProfileState }; val uiState = MutableStateFlow<ProfileState>(ProfileState.Loading)
