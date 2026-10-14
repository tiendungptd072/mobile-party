package snippets.offline_pagination.production

import verification.support.*
import androidx.paging.*
import androidx.room.*
import kotlinx.coroutines.flow.*
suspend fun verificationSnippet() {
// #region show
database.withTransaction {
    if (type == LoadType.REFRESH) remoteKeyDao.clear()
    remoteKeyDao.upsert(RemoteKey(query, page.nextCursor))
    dao.upsertAll(page.items.map(NetworkPost::toEntity))
}
// #endregion

}
