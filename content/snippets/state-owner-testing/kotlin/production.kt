package snippets.state_owner_testing.production

// #region show
val database = Room.inMemoryDatabaseBuilder<AppDatabase>(context)
    .setDriver(BundledSQLiteDriver()).build()
try {
    database.postDao().upsert(postEntity)
    assertEquals(listOf(postEntity), database.postDao().observeAll().first())
} finally {
    database.close()
}
// #endregion
