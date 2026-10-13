// #region show
render(<Counter />);
fireEvent.press(screen.getByRole("button", { name: "Add" }));
expect(screen.getByText("Count: 1")).toBeTruthy();
// #endregion
