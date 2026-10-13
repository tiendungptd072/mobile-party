package snippets.dependency_injection.learn_basic

// #region show
class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()
// #endregion
