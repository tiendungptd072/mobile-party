package snippets.form.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class SignInState(val canSubmit: Boolean = false, val isSubmitting: Boolean = false, val isSignedIn: Boolean = false, val serverError: String? = null, val email: String = "", val password: String = ""); val _state = MutableStateFlow(SignInState()); val state = _state.asStateFlow()
