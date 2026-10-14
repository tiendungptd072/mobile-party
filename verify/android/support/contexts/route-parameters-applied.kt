package snippets.route_parameters.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
@kotlinx.serialization.Serializable data class ProfileDestination(val userId: String); @Composable fun ProfileRoute(userId: String) = Unit
