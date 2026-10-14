package snippets.dependency_injection.applied

import verification.support.*
import dagger.Module
import dagger.Binds
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
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
