package snippets.secure_storage.applied
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
const val KEY_ALIAS = "session-key"; data class EncryptedToken(val iv: ByteArray, val ciphertext: ByteArray)
