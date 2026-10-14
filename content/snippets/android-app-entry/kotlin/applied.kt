package snippets.android_app_entry.applied

import verification.support.*
import android.os.*
import androidx.activity.ComponentActivity
import androidx.activity.compose.*
// #region show
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AppTheme { AppRoot() } }
    }
}
// #endregion
