package snippets.offline_pagination.basic

// #region show
val posts: Flow<PagingData<PostEntity>> = Pager(
    config = PagingConfig(pageSize = 30),
    remoteMediator = FeedRemoteMediator(api, database),
) { database.postDao().pagingSource() }.flow
// #endregion
