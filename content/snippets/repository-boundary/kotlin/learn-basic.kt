package snippets.repository_boundary.learn_basic

import verification.support.*
import androidx.lifecycle.*
// #region show
interface ProfileRepository {
    suspend fun getProfile(id: String): Profile
}

class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()
// #endregion
