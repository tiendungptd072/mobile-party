package snippets.button.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class SaveState(val isSaving: Boolean = false, val saveError: String? = null); val _state = MutableStateFlow(SaveState())
