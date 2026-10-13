// #region show
jest.useFakeTimers();

test("opens Ada's profile", async () => {
  const Navigation = createStaticNavigation(AppStack);
  const user = userEvent.setup();
  await render(<Navigation />);
  await user.press(screen.getByRole("button", { name: "Open profile" }));
  await act(() => jest.runAllTimers());
  expect(screen.getByText("Profile: Ada")).toBeVisible();
});
// #endregion
