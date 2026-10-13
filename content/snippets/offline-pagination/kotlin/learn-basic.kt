package snippets.offline_pagination.learn_basic

// #region show
@Dao
interface PostDao {
    @Query("SELECT * FROM posts ORDER BY publishedAt DESC")
    fun pagingSource(): PagingSource<Int, PostEntity>
}
// #endregion
