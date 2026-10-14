package snippets.global_state.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class ProfileUiState(val name: String); class ProfileViewModel : ViewModel() { val state = MutableStateFlow(ProfileUiState("Ada")); fun rename(name: String) = Unit }
