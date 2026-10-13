package snippets.refresh_bookmark_races.production

// #region show
@Test fun bookmarkSurvivesLateRefresh() = runTest {
    val pending = CompletableDeferred<List<Post>>()
    var state = FeedState()
    val refresh = launch(start = CoroutineStart.UNDISPATCHED) {
        state = reduceFeed(state, FeedEvent.Refreshed(pending.await()))
    }
    state = reduceFeed(state, FeedEvent.BookmarkToggled("a"))
    pending.complete(listOf(Post("a", "Fresh")))
    refresh.join()
    assertEquals("Fresh", state.posts.single().title)
    assertTrue("a" in state.bookmarkedIds)

    val refreshed = reduceFeed(FeedState(), FeedEvent.Refreshed(state.posts))
    val tappedAfter = reduceFeed(refreshed, FeedEvent.BookmarkToggled("a"))
    assertEquals("Fresh", tappedAfter.posts.single().title)
    assertTrue("a" in tappedAfter.bookmarkedIds)
}
// #endregion
