package snippets.recipes.biometric_login

import verification.support.*
import androidx.biometric.BiometricPrompt
fun verificationSnippet() {
// #region show
val prompt = BiometricPrompt(
    activity,
    object : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationSucceeded(
            result: BiometricPrompt.AuthenticationResult,
        ) {
            viewModel.resumeSession()
        }

        override fun onAuthenticationError(code: Int, message: CharSequence) {
            viewModel.showLockedState()
        }
    },
)
prompt.authenticate(promptInfo)
// #endregion

}
