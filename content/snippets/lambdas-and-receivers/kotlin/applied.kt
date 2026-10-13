package snippets.lambdas_and_receivers.applied

// #region show
val request = buildRequest {
    header("Accept", "application/json")
    timeout(5.seconds)
}
// #endregion
