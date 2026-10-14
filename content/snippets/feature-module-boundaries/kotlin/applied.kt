package snippets.feature_module_boundaries.applied

import verification.support.*
import androidx.lifecycle.*
// #region show
class ProfileViewModel(
    private val reader: ProfileReader,
) : ViewModel()
// #endregion
