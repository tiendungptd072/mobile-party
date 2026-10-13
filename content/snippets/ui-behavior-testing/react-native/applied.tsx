// #region show
const onRetry = jest.fn();
render(<ProfileScreen state={{ kind: "error" }} onRetry={onRetry} />);
fireEvent.press(screen.getByRole("button", { name: "Retry" }));
expect(onRetry).toHaveBeenCalledTimes(1);
// #endregion
