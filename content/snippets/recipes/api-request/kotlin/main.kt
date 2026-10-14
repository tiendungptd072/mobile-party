package snippets.recipes.api_request

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
class VerificationViewModel : ViewModel() {
// #region show
fun loadProfile() = viewModelScope.launch {
    uiState.value = ProfileState.Loading
    try {
        uiState.value = ProfileState.Success(repository.profile())
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (error: Exception) {
        uiState.value = ProfileState.Error("Could not load profile")
    }
}
// #endregion

}
