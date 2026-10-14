package snippets.offline_pagination.learn_basic

import verification.support.*
import androidx.paging.*
import androidx.room.*
// #region show
@Dao
interface PostDao {
    @Query("SELECT * FROM posts ORDER BY publishedAt DESC")
    fun pagingSource(): PagingSource<Int, PostEntity>
}
// #endregion
