package snippets.offline_pagination.basic

import verification.support.*
import androidx.paging.*
import kotlinx.coroutines.flow.*
val api = feedApi
// #region show
val posts: Flow<PagingData<PostEntity>> = Pager(
    config = PagingConfig(pageSize = 30),
    remoteMediator = FeedRemoteMediator(api, database),
) { database.postDao().pagingSource() }.flow
// #endregion
