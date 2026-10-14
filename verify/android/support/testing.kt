package verification.support

import android.content.Context
import androidx.work.*
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.test.*
import org.junit.rules.TestWatcher
import org.junit.runner.Description

val composeTestRule: ComposeContentTestRule get() = TODO("Provided by the Android test host")
val workManager: WorkManager get() = TODO()
class SyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result = TODO()
}
suspend fun runWorker(error: Throwable): ListenableWorker.Result = TODO()
@OptIn(kotlinx.coroutines.ExperimentalCoroutinesApi::class)
class MainDispatcherRule : TestWatcher() {
    private val dispatcher = StandardTestDispatcher()
    override fun starting(description: Description) { Dispatchers.setMain(dispatcher) }
    override fun finished(description: Description) { Dispatchers.resetMain() }
}
