// #region show
await render(<AppNavigator initialUrl="myapp://profiles/missing" />);
expect(screen.getByText("Profile unavailable")).toBeVisible();
// #endregion
