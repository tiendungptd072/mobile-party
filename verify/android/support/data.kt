package verification.support

import androidx.paging.*
import androidx.room.*
import kotlinx.coroutines.flow.*

@Entity(tableName = "posts")
data class PostEntity(@PrimaryKey val id: String, val title: String, val publishedAt: Long = 0)
data class NetworkPost(val id: String, val title: String) { fun toEntity() = PostEntity(id, title) }
data class NetworkPage(val items: List<NetworkPost>, val nextCursor: String?)
interface FeedApi { suspend fun getFeed(): List<NetworkPost>; suspend fun getFeed(cursor: String?): NetworkPage }
val feedApi: FeedApi get() = TODO()
@Dao interface PostDao {
    @Query("SELECT * FROM posts") fun observeAll(): Flow<List<PostEntity>>
    @Query("SELECT * FROM posts") fun observePosts(): Flow<List<Post>>
    @Query("SELECT * FROM posts") fun pagingSource(): PagingSource<Int, PostEntity>
    @Upsert suspend fun upsert(post: PostEntity)
    @Upsert suspend fun upsertAll(posts: List<PostEntity>)
}
@Database(entities = [PostEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() { abstract fun postDao(): PostDao }
val database: AppDatabase get() = TODO()
val dao: PostDao get() = database.postDao()
val postDao: PostDao get() = dao
val postsDao: PostDao get() = dao
class FavoriteDao { fun observeIds(): Flow<Set<String>> = flowOf(emptySet()) }
val favoriteDao = FavoriteDao()
val favoritesDao = favoriteDao
data class RemoteKey(val query: String, val nextCursor: String?)
class RemoteKeyDao { suspend fun clear() = Unit; suspend fun upsert(key: RemoteKey) = Unit }
val remoteKeyDao = RemoteKeyDao()
val postEntity = PostEntity("a", "Post")
val page = NetworkPage(emptyList(), null)
val type = LoadType.REFRESH
fun cursorFor(type: LoadType, state: PagingState<Int, PostEntity>): String? = null
@OptIn(ExperimentalPagingApi::class)
class FeedRemoteMediator(api: FeedApi, database: AppDatabase) : RemoteMediator<Int, PostEntity>() {
    override suspend fun load(loadType: LoadType, state: PagingState<Int, PostEntity>): MediatorResult = TODO()
}
class FeedPagingSource(api: Api) : PagingSource<Int, Post>() {
    override fun getRefreshKey(state: PagingState<Int, Post>): Int? = null
    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Post> = TODO()
}
fun PostEntity.toDomain() = Post(id, title)
val android.content.Context.dataStore by androidx.datastore.preferences.preferencesDataStore(name = "verification-settings")
val dataStore get() = context.dataStore
val themeKey = androidx.datastore.preferences.core.stringPreferencesKey("theme")
