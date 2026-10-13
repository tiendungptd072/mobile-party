package snippets.feature_module_boundaries.production

// #region show
class ProfileEntry(private val database: AppDatabase) {
    fun createViewModel(): ProfileViewModel {
        val reader: ProfileReader = RoomProfileReader(database.profileDao())
        return ProfileViewModel(reader)
    }
}
// #endregion
