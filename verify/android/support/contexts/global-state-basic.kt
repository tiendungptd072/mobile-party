package snippets.global_state.basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
@Composable fun ProfileScreen(state: ProfileUiState, onSignOut: () -> Unit) = Unit; class ProfileViewModel : ViewModel() { val uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading); fun signOut() = Unit }
