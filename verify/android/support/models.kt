package verification.support

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.*
import kotlinx.serialization.Serializable

@Serializable
data class User(val id: String = "ada", val name: String = "Ada", val displayName: String = name, val nickname: String? = null, val avatarUrl: String? = null, val isActive: Boolean = true, val selected: Boolean = false, val profile: Profile? = null)
@Serializable
data class Profile(val id: String = "ada", val name: String = "Ada", val userId: String = id)
@Serializable
data class Post(val id: String = "a", val title: String = "Post", val createdAt: Long = 0)
data class UserDto(val id: String, val name: String, val displayName: String = name)
data class ProfileDto(val id: String, val displayName: String) { fun toDomain() = Profile(id, displayName) }
data class Item(val id: String = "a", val price: Double = 1.0)
typealias CartItem = Item
data class Product(val id: String, val name: String)
data class Photo(val id: String, val url: String, val description: String? = null)
data class Page(val items: List<Post>, val nextCursor: String? = null)
data class UserListState(val users: List<User>)
data class FeedState(val posts: List<Post> = emptyList(), val bookmarkedIds: Set<String> = emptySet())
sealed interface FeedUiState {
    data object Loading : FeedUiState
    data class Ready(val items: List<Post>) : FeedUiState
    data object Error : FeedUiState
}
sealed interface ProfileState {
    data object Loading : ProfileState
    data class Ready(val profile: Profile) : ProfileState
    data object Error : ProfileState
}
sealed interface ProfileUiState {
    data object Loading : ProfileUiState
    data class Ready(val profile: Profile) : ProfileUiState
    data class Error(val message: String) : ProfileUiState
}
sealed interface ProfilesUiState {
    data object Loading : ProfilesUiState
    data object Empty : ProfilesUiState
    data class Ready(val items: List<Profile>) : ProfilesUiState
}
sealed interface UiState {
    data object Loading : UiState
    data object Empty : UiState
    data class Ready(val data: Profile) : UiState
}
sealed interface SubmitState {
    data object Idle : SubmitState
    data object Submitting : SubmitState
    data class Failed(val message: String) : SubmitState
    data class Succeeded(val userId: String) : SubmitState
}
sealed interface SessionState {
    data object Restoring : SessionState
    data object SignedOut : SessionState
    data class SignedIn(val user: User) : SessionState
}
sealed interface UserResult {
    data class Success(val user: User) : UserResult
    data class Failure(val error: UserError) : UserResult
}
enum class UserError { Offline, Unknown }
enum class ProfileError { Offline, NotFound, Unknown }
enum class AppError { Offline, Unknown }
enum class Theme { Light, Dark, System; companion object { fun fromStoredValue(value: String?): Theme? = entries.firstOrNull { it.name.equals(value, true) } } }
enum class ThemePreference { Light, Dark, System }
sealed interface Destination {
    data object Home : Destination
    data object InvalidLink : Destination
    data class Profile(val id: String) : Destination
}
data class Token(val value: String)
data class RouteParams(val userId: String?)
data class UserId(val value: String) { companion object { fun parse(value: String): UserId? = value.takeIf(String::isNotBlank)?.let(::UserId) } }
class NetworkError : java.io.IOException()
class ValidationError : Exception()
class InvalidPendingAction : Exception()
class InvalidUserException(id: String) : Exception(id)
class ProfileNotFoundException : Exception()
class Analytics { fun trackVisible() = Unit }
class Camera { fun startPreview() = Unit; fun stopPreview() = Unit }
class SessionViewModel : ViewModel() { val state = MutableStateFlow<SessionState>(SessionState.Restoring) }
class ItemsViewModel : ViewModel() { val items = MutableStateFlow(emptyList<Item>()) }
class MailViewModel : ViewModel() { val selectedId = MutableStateFlow<String?>(null); fun select(id: String?) = Unit }
class ProfileViewModel : ViewModel() {
    val state = MutableStateFlow<ProfileState>(ProfileState.Loading)
    val uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading)
    val profile = MutableStateFlow<Profile?>(null)
    fun retry() = Unit
    fun rename(name: String) = Unit
    suspend fun loadProfile(id: String) = Unit
}
class FeedViewModel(repository: FakeFeedRepository = FakeFeedRepository()) : ViewModel() {
    val uiState = MutableStateFlow<FeedUiState>(FeedUiState.Ready(emptyList()))
    val posts: Flow<androidx.paging.PagingData<Post>> = flowOf(androidx.paging.PagingData.empty())
    fun loadMore() = Unit
}
class FakeFeedRepository(posts: List<Post> = emptyList()) { fun emit(posts: List<Post>) = Unit }

val user = User()
val profile = Profile("ada", "Ada")
val post = Post()
val users = listOf(user)
val posts = listOf(post)
val photos = emptyList<Photo>()
val items = emptyList<Item>()
val userId = "ada"
val id = "ada"
var name = "Ada"
val title = "Profile"
val description = "Profile photo"
val query = ""
val roomId = "room"
val fallbackAvatar = "https://example.com/avatar.png"
val isLoading = false
val isFavorite = false
val hasUnsavedChanges = false
var showDiscardDialog = false
val showFilters = false
val expanded = false
val preference = ThemePreference.System
val draft = ""
val onChange: (String) -> Unit = {}
val onToggle: (Boolean) -> Unit = {}
val onDelete: () -> Unit = {}
val onSave: () -> Unit = {}
val onOpen: () -> Unit = {}
val onArchive: () -> Unit = {}
val onRetry: () -> Unit = {}
val onDrag: (Float) -> Unit = {}
val onDrop: () -> Unit = {}
val onSelect: (String) -> Unit = {}
val onSearch: (String) -> Unit = {}
val onTimeout: () -> Unit = {}
val openLibrary: () -> Unit = {}
fun openCamera() = Unit
fun showUnavailable() = Unit
fun showInvalidLink() = Unit
fun reportError(error: Throwable) = Unit
fun mapUserError(error: Throwable) = UserError.Unknown
fun track(event: androidx.lifecycle.Lifecycle.Event) = Unit
val analytics = Analytics()
val camera = Camera()
