package snippets.null_safety.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class UserDto(val id: String, val name: String?, val avatarUrl: String?)
