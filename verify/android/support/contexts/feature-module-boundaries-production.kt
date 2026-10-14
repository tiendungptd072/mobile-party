package snippets.feature_module_boundaries.production
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
class RoomProfileReader(dao: ProfileDao) : ProfileReader { override suspend fun load(id: String): Profile = TODO() }; class ProfileDao; fun AppDatabase.profileDao() = ProfileDao(); class ProfileViewModel(reader: ProfileReader) : ViewModel()
