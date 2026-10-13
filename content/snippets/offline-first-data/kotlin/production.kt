package snippets.offline_first_data.production

// #region show
override suspend fun refresh() = database.withTransaction {
    val entities = api.getFeed().map(NetworkPost::toEntity)
    dao.upsertAll(entities)
}
// #endregion
