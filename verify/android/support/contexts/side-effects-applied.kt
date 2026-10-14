package snippets.side_effects.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
val onEvent: (Lifecycle.Event) -> Unit = {}
