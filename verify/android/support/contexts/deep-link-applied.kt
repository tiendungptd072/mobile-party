package snippets.deep_link.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
@kotlinx.serialization.Serializable data class ProfileRoute(val userId: String)
