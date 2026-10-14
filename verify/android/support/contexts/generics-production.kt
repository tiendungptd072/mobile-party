package snippets.generics.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
interface Repository { suspend fun loadUser(): AppResult<User> }; val repository: Repository get() = TODO()
