package snippets.state_owner_testing.production

import verification.support.*
import androidx.room.*
import androidx.sqlite.driver.bundled.BundledSQLiteDriver
import kotlinx.coroutines.flow.*
import org.junit.Assert.*
suspend fun verificationSnippet() {
// #region show
val database = Room.inMemoryDatabaseBuilder<AppDatabase>(context)
    .setDriver(BundledSQLiteDriver()).build()
try {
    database.postDao().upsert(postEntity)
    assertEquals(listOf(postEntity), database.postDao().observeAll().first())
} finally {
    database.close()
}
// #endregion

}
