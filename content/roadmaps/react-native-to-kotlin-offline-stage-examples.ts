export const offlineStageExamples = {
  "offline-pagination": {
    basic: {
      "react-native": {
        name: "Keep the cursor with cached rows",
        summary:
          "The local cache is updated atomically after one page arrives.",
        language: "typescript",
        filename: "feed-cache.ts",
        code: `cache.transaction(() => {
  cache.upsert(page.items);
  cache.nextCursor = page.nextCursor;
});`,
      },
      kotlin: {
        name: "Read pages from Room",
        summary:
          "The Pager's PagingSource is the only source that supplies rows to UI.",
        language: "kotlin",
        filename: "PostDao.kt",
        code: `@Dao
interface PostDao {
    @Query("SELECT * FROM posts ORDER BY publishedAt DESC")
    fun pagingSource(): PagingSource<Int, PostEntity>
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Keep append failure separate",
        summary:
          "Visible content remains while only the failed cursor is retried.",
        language: "typescript",
        filename: "feed-state.ts",
        code: `type FeedState = { items: Post[]; appendError?: Error; nextCursor: string | null };
// Retry reads state.nextCursor; it does not replace state.items.`,
      },
      kotlin: {
        name: "Write RemoteMediator output to Room",
        summary:
          "Network data is persisted before Room invalidates the PagingSource.",
        language: "kotlin",
        filename: "FeedRemoteMediator.kt",
        code: `override suspend fun load(type: LoadType, state: PagingState<Int, PostEntity>) = try {
    val page = api.getFeed(cursorFor(type, state))
    database.withTransaction { dao.upsertAll(page.items.map(NetworkPost::toEntity)) }
    MediatorResult.Success(endOfPaginationReached = page.nextCursor == null)
} catch (error: IOException) { MediatorResult.Error(error) }`,
      },
    },
    production: {
      "react-native": {
        name: "Persist the next page key",
        summary:
          "Restarting the app keeps cursor ownership in the local data boundary.",
        language: "typescript",
        filename: "feed-cache.ts",
        code: `await storage.setItem("feed-next-cursor", JSON.stringify(cache.nextCursor));`,
      },
      kotlin: {
        name: "Persist remote keys transactionally",
        summary: "Keys and rows change together during refresh or append.",
        language: "kotlin",
        filename: "FeedRemoteMediator.kt",
        code: `database.withTransaction {
    if (type == LoadType.REFRESH) remoteKeyDao.clear()
    remoteKeyDao.upsert(RemoteKey(query, page.nextCursor))
    dao.upsertAll(page.items.map(NetworkPost::toEntity))
}`,
      },
    },
  },
  "offline-first-data": {
    basic: {
      "react-native": {
        name: "Read the cache first",
        summary:
          "Refresh changes the repository cache rather than screen state directly.",
        language: "typescript",
        filename: "feed-repository.ts",
        code: `class FeedRepository {
  private items: Post[] = [];
  getSnapshot = () => this.items;
  subscribe = (listener: () => void) => cache.onChange(listener);
  async refresh() { this.items = await api.getFeed(); cache.save(this.items); }
}`,
      },
      kotlin: {
        name: "Define a Room entity and DAO",
        summary: "A DAO exposes local rows as a Flow.",
        language: "kotlin",
        filename: "PostDao.kt",
        code: `@Entity data class PostEntity(@PrimaryKey val id: String, val title: String)

@Dao
interface PostDao {
    @Query("SELECT * FROM PostEntity ORDER BY id") fun observeAll(): Flow<List<PostEntity>>
    @Upsert suspend fun upsertAll(posts: List<PostEntity>)
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Synchronize one cache",
        summary:
          "Network data is mapped before becoming observable application data.",
        language: "typescript",
        filename: "feed-repository.ts",
        code: `async refresh() {
  const response = await api.getFeed();
  this.items = response.items.map(toPost);
  cache.save(this.items);
}`,
      },
      kotlin: {
        name: "Refresh Room, observe Room",
        summary: "The repository never exposes the network DTO to the screen.",
        language: "kotlin",
        filename: "OfflineFirstFeedRepository.kt",
        code: `class OfflineFirstFeedRepository(
    private val api: FeedApi, private val dao: PostDao,
) : FeedRepository {
    override fun observeFeed(): Flow<List<Post>> = dao.observeAll().map { it.map(PostEntity::toDomain) }
    override suspend fun refresh() { dao.upsertAll(api.getFeed().map(NetworkPost::toEntity)) }
}`,
      },
    },
    production: {
      "react-native": {
        name: "Make replay explicit",
        summary:
          "A queued mutation has an idempotency key and a visible pending state.",
        language: "typescript",
        filename: "pending-actions.ts",
        code: `await pendingActions.enqueue({
  id: crypto.randomUUID(), type: "bookmark", postId, desiredValue: true,
});`,
      },
      kotlin: {
        name: "Separate durable local work",
        summary:
          "A transaction updates local state before observers see a completed refresh.",
        language: "kotlin",
        filename: "OfflineFirstFeedRepository.kt",
        code: `override suspend fun refresh() = database.withTransaction {
    val entities = api.getFeed().map(NetworkPost::toEntity)
    dao.upsertAll(entities)
}`,
      },
    },
  },
} as const;
