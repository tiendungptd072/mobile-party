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
        name: "Control an asynchronous save",
        summary:
          "A controlled promise verifies pending and completed UI states without depending on timers.",
        language: "tsx",
        filename: "ProfileScreen.test.tsx",
        code: `let finishSave!: () => void;
const onSave = jest.fn(() => new Promise<void>((resolve) => {
  finishSave = resolve;
}));
render(<ProfileScreen onSave={onSave} />);
fireEvent.press(screen.getByRole("button", { name: "Save" }));
expect(screen.getByText("Saving…")).toBeTruthy();
await act(async () => { finishSave(); });
expect(await screen.findByText("Saved")).toBeTruthy();`,
      },
      kotlin: {
        name: "Control an asynchronous save",
        summary:
          "A deferred result verifies pending and completed semantics without sleeping.",
        language: "kotlin",
        filename: "ProfileScreenTest.kt",
        code: `val saveResult = CompletableDeferred<Unit>()
composeTestRule.setContent {
    ProfileScreen(onSave = { saveResult.await() })
}
composeTestRule.onNodeWithText("Save").performClick()
composeTestRule.onNodeWithText("Saving…").assertExists()
saveResult.complete(Unit)
composeTestRule.waitUntil(5_000) {
    composeTestRule.onAllNodesWithText("Saved").fetchSemanticsNodes().isNotEmpty()
}`,
      },
    },
  },
} as const;
