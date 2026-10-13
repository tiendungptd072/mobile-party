package snippets.offline_pagination.production

// #region show
database.withTransaction {
    if (type == LoadType.REFRESH) remoteKeyDao.clear()
    remoteKeyDao.upsert(RemoteKey(query, page.nextCursor))
    dao.upsertAll(page.items.map(NetworkPost::toEntity))
}
// #endregion
