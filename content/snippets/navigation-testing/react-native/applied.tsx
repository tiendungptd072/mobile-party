// #region show
jest.useFakeTimers();
await user.press(screen.getByRole("button", { name: "Open profile" }));
await act(() => jest.runAllTimers());
expect(screen.getByText("Profile: Ada")).toBeVisible();
// #endregion
