package snippets.dependency_injection.learn_basic

import verification.support.*
import androidx.lifecycle.*
// #region show
class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel()
// #endregion
