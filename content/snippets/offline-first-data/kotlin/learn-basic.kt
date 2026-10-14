package snippets.offline_first_data.learn_basic

import verification.support.*
import androidx.room.*
import kotlinx.coroutines.flow.*
// #region show
@Entity data class PostEntity(@PrimaryKey val id: String, val title: String)

@Dao
interface PostDao {
    @Query("SELECT * FROM PostEntity ORDER BY id") fun observeAll(): Flow<List<PostEntity>>
    @Upsert suspend fun upsertAll(posts: List<PostEntity>)
}
// #endregion
