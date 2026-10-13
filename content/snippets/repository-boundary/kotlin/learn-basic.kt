package snippets.repository_boundary.learn_basic

// #region show
interface ProfileRepository {
    suspend fun getProfile(id: String): Profile
}

class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()
// #endregion
