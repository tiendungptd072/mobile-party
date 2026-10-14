package snippets.form.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class SignInUiState(val email: String, val password: String, val canSubmit: Boolean); sealed interface SignInEvent { data class EmailChanged(val value: String): SignInEvent; data class PasswordChanged(val value: String): SignInEvent; data object Submit: SignInEvent }
