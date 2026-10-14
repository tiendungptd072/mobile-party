package snippets.repository_boundary.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
interface ProfileRepository { suspend fun getProfile(id: String): Profile }
