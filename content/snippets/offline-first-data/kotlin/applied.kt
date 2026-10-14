package snippets.offline_first_data.applied

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
class OfflineFirstFeedRepository(
    private val api: FeedApi, private val dao: PostDao,
) : FeedRepository {
    override fun observeFeed(): Flow<List<Post>> = dao.observeAll().map { it.map(PostEntity::toDomain) }
    override suspend fun refresh() { dao.upsertAll(api.getFeed().map(NetworkPost::toEntity)) }
}
// #endregion
