package snippets.async.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface ProfileUiState { data object Loading : ProfileUiState; data class Ready(val profile: Profile) : ProfileUiState; data object Error : ProfileUiState }
interface ProfileRepository { fun observeProfile(id: String): Flow<Profile> }
