package verification.support

import android.content.Context
import android.net.Uri
import androidx.lifecycle.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.sync.Mutex

interface ProfileRepository {
    suspend fun getProfile(id: String): Profile
    suspend fun load(): Profile
    suspend fun load(id: String): Profile
    fun observeProfile(id: String): Flow<Profile?>
    fun observeAuthorized(id: String): Flow<ProfileState>
}
abstract class OfflineFirstProfileRepository : ProfileRepository
interface ProfileApi { suspend fun getProfile(id: String): ProfileDto }
interface ProfileReader { suspend fun load(id: String): Profile }
interface FeedRepository { fun observeFeed(): Flow<List<Post>>; suspend fun refresh() }
interface ImageRepository { suspend fun load(url: String?): android.graphics.Bitmap }
typealias Image = android.graphics.Bitmap
class Repository {
    suspend fun getUser(id: String): User = TODO()
    suspend fun loadUser(id: String): User = TODO()
    suspend fun load(): Profile = TODO()
    suspend fun load(id: String): Profile = TODO()
    suspend fun search(query: String): List<Item> = TODO()
    suspend fun refresh() = Unit
    suspend fun profile(): Profile = TODO()
    suspend fun getPage(cursor: String): Page = TODO()
    suspend fun syncPending() = Unit
    suspend fun save() = Unit
    val posts: Flow<List<Post>> = flowOf(emptyList())
    val visiblePosts: Flow<List<Post>> = posts
}
class Api {
    suspend fun loadPage(page: Int): Page = TODO()
    suspend fun loadPosts(): List<Post> = TODO()
}
val api = Api()
val repository = Repository()
val syncRepository = Repository()
val context: Context get() = TODO("Provided by the host Android test or application")
val navController: androidx.navigation.NavHostController get() = TODO()
class AppNavigator {
    fun open(destination: Destination) = Unit
    fun openSignIn() = Unit
}
val navigator = AppNavigator()
fun parseDestination(uri: Uri): Destination? = TODO()
class Parser { fun parseAndValidate(uri: Uri): Destination? = TODO() }
val parser = Parser()
object session { fun isSignedIn() = true }
object pendingLinks { fun save(destination: Destination) = Unit }
object authorization { suspend fun canOpen(destination: Destination) = true }
object credentialStore { suspend fun readRefreshToken(): String? = TODO(); suspend fun clear() = Unit }
object auth { suspend fun refresh(token: String): User = TODO(); suspend fun refresh(): Token = TODO(); suspend fun signIn(email: String, password: String) = Unit }
object tokenStore { fun currentValidToken(): Token? = TODO(); fun save(token: Token) = Unit }
val refreshMutex = Mutex()
val sessionMutex = Mutex()
val sessionState = MutableStateFlow<SessionState>(SessionState.Restoring)
val sessionStore = MutableStateFlow<SessionState>(SessionState.Restoring)
class Connection { fun start() = Unit; fun stop() = Unit }
object chat { fun connect(id: String) = Connection() }
class ConnectivityListener(val callback: (Boolean) -> Unit)
object connectivity { fun addListener(listener: ConnectivityListener) = Unit; fun removeListener(listener: ConnectivityListener) = Unit }
val onStatusChanged: (Boolean) -> Unit = {}
val lifecycleOwner: LifecycleOwner get() = TODO()
fun buildRequest(configure: RequestBuilder.() -> Unit) = RequestBuilder().apply(configure)
class RequestBuilder { fun header(key: String, value: String) = Unit; fun timeout(ms: Long) = Unit }
fun RequestBuilder.timeout(duration: kotlin.time.Duration) = Unit
fun matchesQuery(user: User, query: String) = user.name.contains(query)
fun Throwable.toUiMessage(): String = message ?: "Unknown error"
fun Throwable.toUserError() = UserError.Unknown
const val REMINDER_CHANNEL_ID = "reminders"
val onPermissionResult: (Boolean) -> Unit = {}
val onRefresh: () -> Unit = {}
class MainActivity : androidx.activity.ComponentActivity()
fun navigate(route: String) = Unit
fun UserDto.toDomain() = User(id = id, name = name, displayName = displayName)
fun append(page: Page) = Unit
