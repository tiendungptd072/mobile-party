package snippets.offline_first_data.production

import verification.support.*
import androidx.room.*
import kotlinx.coroutines.flow.*
val api = feedApi
class VerificationRepository : FeedRepository { override fun observeFeed(): Flow<List<Post>> = flowOf(emptyList())
// #region show
override suspend fun refresh() = database.withTransaction {
    val entities = api.getFeed().map(NetworkPost::toEntity)
    dao.upsertAll(entities)
}
// #endregion

}
