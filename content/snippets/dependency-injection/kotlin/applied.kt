package snippets.dependency_injection.applied

// #region show
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    abstract fun bindProfileRepository(
        implementation: OfflineFirstProfileRepository,
    ): ProfileRepository
}
// #endregion
