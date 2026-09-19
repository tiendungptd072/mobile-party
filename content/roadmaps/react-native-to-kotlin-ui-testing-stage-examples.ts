export const uiTestingStageExamples = {
  "ui-behavior-testing": {
    basic: {
      "react-native": {
        name: "Press and assert visible text",
        summary: "The test uses a visible button label and visible result.",
        language: "tsx",
        filename: "Counter.test.tsx",
        code: `render(<Counter />);
fireEvent.press(screen.getByRole("button", { name: "Add" }));
expect(screen.getByText("Count: 1")).toBeTruthy();`,
      },
      kotlin: {
        name: "Click and assert semantic text",
        summary: "The test performs a user action against a semantic node.",
        language: "kotlin",
        filename: "CounterTest.kt",
        code: `composeTestRule.setContent { Counter() }
composeTestRule.onNodeWithText("Add").performClick()
composeTestRule.onNodeWithText("Count: 1").assertExists()`,
      },
    },
    applied: {
      "react-native": {
        name: "Test a reusable screen contract",
        summary:
          "Plain state and callbacks make a screen behavior test focused.",
        language: "tsx",
        filename: "ProfileScreen.test.tsx",
        code: `const onRetry = jest.fn();
render(<ProfileScreen state={{ kind: "error" }} onRetry={onRetry} />);
fireEvent.press(screen.getByRole("button", { name: "Retry" }));
expect(onRetry).toHaveBeenCalledTimes(1);`,
      },
      kotlin: {
        name: "Test a reusable screen contract",
        summary:
          "Plain state and callbacks keep the screen content test focused.",
        language: "kotlin",
        filename: "ProfileScreenTest.kt",
        code: `var retries = 0
composeTestRule.setContent {
    ProfileScreen(state = ProfileUiState.Error, onRetry = { retries++ })
}
composeTestRule.onNodeWithText("Retry").performClick()
assertThat(retries).isEqualTo(1)`,
      },
    },
    production: {
      "react-native": {
        name: "Reserve identifiers for the hard cases",
        summary:
          "A testID is used only when user-visible queries cannot identify the control.",
        language: "tsx",
        filename: "SaveButton.test.tsx",
        code: `render(<SaveButton testID="profile-save" onSave={onSave} />);
fireEvent.press(screen.getByTestId("profile-save"));
expect(onSave).toHaveBeenCalledTimes(1);`,
      },
      kotlin: {
        name: "Reserve tags for the hard cases",
        summary: "A test tag selects an otherwise ambiguous semantic node.",
        language: "kotlin",
        filename: "SaveButtonTest.kt",
        code: `composeTestRule.setContent { SaveButton(onSave, Modifier.testTag("profile-save")) }
composeTestRule.onNodeWithTag("profile-save").performClick()
assertThat(saveCalls).isEqualTo(1)`,
      },
    },
  },
} as const;
