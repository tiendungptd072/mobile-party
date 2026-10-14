package snippets.collection_transforms.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
fun User.matchesQuery(query: String) = name.contains(query)
