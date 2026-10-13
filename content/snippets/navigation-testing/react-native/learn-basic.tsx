// #region show
const Navigation = createStaticNavigation(AppStack);
const user = userEvent.setup();
await render(<Navigation />);
await user.press(screen.getByRole("button", { name: "Open profile" }));
expect(screen.getByText("Profile: Ada")).toBeVisible();
// #endregion
