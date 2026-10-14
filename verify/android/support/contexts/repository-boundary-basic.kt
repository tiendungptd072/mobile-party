package snippets.repository_boundary.basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
val _uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading)
