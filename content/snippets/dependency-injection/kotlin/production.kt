package snippets.dependency_injection.production

// #region show
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val repository: ProfileRepository,
) : ViewModel()

@Composable
fun ProfileRoute(viewModel: ProfileViewModel = hiltViewModel()) { /* render */ }
// #endregion
