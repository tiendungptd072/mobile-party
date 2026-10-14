package snippets.global_state.learn_basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class ProfileUiState(val name: String = "")
