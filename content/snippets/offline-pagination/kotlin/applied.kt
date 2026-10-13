package snippets.offline_pagination.applied

// #region show
override suspend fun load(type: LoadType, state: PagingState<Int, PostEntity>) = try {
    val page = api.getFeed(cursorFor(type, state))
    database.withTransaction { dao.upsertAll(page.items.map(NetworkPost::toEntity)) }
    MediatorResult.Success(endOfPaginationReached = page.nextCursor == null)
} catch (error: IOException) { MediatorResult.Error(error) }
// #endregion
