package verification.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.unit.dp

// Application UI contracts; Compose itself is supplied by the pinned libraries.
@Composable fun Avatar(user: User? = null) = Unit
@Composable fun MoreButton() = Unit
@Composable fun IconButton(name: String) = Unit
@Composable fun Icon() = Unit
@Composable fun OnlineBadge(modifier: Modifier = Modifier) = Unit
@Composable fun PlayIcon() = Unit
@Composable fun SettingsGrid() = Unit
@Composable fun SettingsList() = Unit
@Composable fun TwoPaneMail(selectedId: String? = null) = Unit
@Composable fun SinglePaneMail(selectedId: String? = null) = Unit
@Composable fun MailScreen(selectedId: String?, onSelect: (String?) -> Unit = {}) = Unit
@Composable fun ProfileCard(profile: Profile) = Unit
@Composable fun ProfileCard(user: User) = Unit
@Composable fun ProfileScreen(userId: String) = Unit
@Composable fun ProfileScreen(state: ProfileState, onRetry: () -> Unit) = Unit
@Composable fun ProfileScreen(profile: Profile?) = Unit
@Composable fun Profile(user: User) = Unit
@Composable fun Profile() = Unit
@Composable fun ProfileHeader() = Unit
@Composable fun ProfileDetails() = Unit
@Composable fun ProfileContent() = Unit
@Composable fun HeaderActions() = Unit
@Composable fun AppNavigation() = Unit
@Composable fun AppNavGraph() = Unit
@Composable fun AuthNavGraph() = Unit
@Composable fun SplashScreen() = Unit
@Composable fun InvalidLinkScreen() = Unit
@Composable fun AuthorizedProfileRoute(id: UserId) = Unit
@Composable fun EditProfileRoute(navController: androidx.navigation.NavController) = Unit
@Composable fun EditProfileContent(draft: String, onChange: (String) -> Unit) = Unit
@Composable fun ProfileList(profiles: List<Profile>) = Unit
@Composable fun LoadingView() = Unit
@Composable fun EmptyView(onRetry: () -> Unit = {}) = Unit
@Composable fun Content(data: Profile) = Unit
@Composable fun ErrorPanel(message: String, onRetry: () -> Unit = {}) = Unit
@Composable fun ErrorView(message: String, onRetry: () -> Unit) = Unit
@Composable fun Spinner() = Unit
@Composable fun Form() = Unit
@Composable fun Success(userId: String) = Unit
@Composable fun UserRow(user: User, onSelect: (String) -> Unit = {}) = Unit
@Composable fun UserRow(user: User, onClick: () -> Unit) = Unit
@Composable fun UserRow(name: String) = Unit
@Composable fun PostRow(post: Post) = Unit
@Composable fun FeedRow(post: Post) = Unit
@Composable fun EditablePost(post: Post) = Unit
@Composable fun ItemRow(item: Item) = Unit
@Composable fun DraftEditor(item: Item) = Unit
@Composable fun ProductRow(product: Product) = Unit
@Composable fun PhotoTile(photo: Photo) = Unit
@Composable fun FeedScreen(state: FeedUiState) = Unit
@Composable fun Filters() = Unit
@Composable fun CameraPicker() = Unit
@Composable fun ScrollToTopButton() = Unit
@Composable fun MessageList(modifier: Modifier) = Unit
@Composable fun RetryRow(error: Throwable, retry: () -> Unit) = Unit
@Composable fun TotalLabel(total: Double) = Unit
@Composable fun TagEditor(tags: List<String>, onAdd: (String) -> Unit) = Unit
@Composable fun EmailField(value: String, onValueChange: (String) -> Unit) = Unit
@Composable fun PasswordField(value: String, onChange: (String) -> Unit) = Unit
@Composable fun AppRoot() = Unit
@Composable fun Counter() = Unit
@Composable fun AppNavHost(startProfileId: String? = null) = Unit
@Composable fun Card() = Unit
@Composable fun AppTheme(content: @Composable () -> Unit) { content() }
@Composable fun AppRoot(navigator: AppNavigator) = Unit
@Composable fun AppRoot(initialDestination: Destination) = Unit
@Composable fun ItemsScreen(items: List<Item>) = Unit
@Composable fun ProfileView(profile: Profile) = Unit
@Composable fun FeedList(posts: List<Post>) = Unit
@Composable fun SessionScreen(state: SessionState) = Unit
@Composable fun HomeScreen(onOpenProfile: (String) -> Unit) = Unit
@Composable fun ProfileRoute(navController: androidx.navigation.NavController) = Unit
@Composable fun EditProfileRoute() = Unit
@Composable fun ProfileForm(name: String, onRename: (String) -> Unit) = Unit
@Composable fun MoreIcon() = Unit
@Composable fun Counter(count: Int, onIncrement: () -> Unit) = Unit
@Composable fun ArticleDetails(modifier: Modifier) = Unit
@Composable fun RetryButton(onClick: () -> Unit) = Unit
@Composable fun CartRoute(viewModel: CheckoutViewModel) = Unit
class CheckoutViewModel : androidx.lifecycle.ViewModel()
object AppSpacing { val medium = 16.dp; val small = 8.dp; val large = 24.dp }
@Composable fun ProfileRoute(onEdit: () -> Unit) = Unit
@Composable fun SwipeRowContent() = Unit
val onMore: () -> Unit = {}
val onPlay: () -> Unit = {}
val onDraftChange: (String) -> Unit = {}
val LocalSpacing = compositionLocalOf { 8.dp }
val painter: Painter get() = TODO("Provided by the host application")
