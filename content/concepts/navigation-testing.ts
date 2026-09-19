export const navigationTestingConcept = {
  id: "navigation-testing",
  slug: "navigation-testing",
  title: "Navigation Tests",
  description:
    "Test a user-visible destination and its arguments from an app navigation graph instead of asserting private navigation implementation details.",
  category: "testing",
  order: 45.98,
  aliases: ["navigation test", "destination test", "route test"],
  keywords: ["navigation", "test", "destination", "deep link", "arguments"],
  implementations: {
    "react-native": {
      name: "Test a visible React Navigation destination",
      summary:
        "Render the app navigation tree, perform the user action, then assert the destination content.",
      language: "tsx",
      filename: "AppNavigator.test.tsx",
      code: `jest.useFakeTimers();

test("opens Ada's profile", async () => {
  const Navigation = createStaticNavigation(AppStack);
  const user = userEvent.setup();
  await render(<Navigation />);
  await user.press(screen.getByRole("button", { name: "Open profile" }));
  await act(() => jest.runAllTimers());
  expect(screen.getByText("Profile: Ada")).toBeVisible();
});`,
    },
    kotlin: {
      name: "Test a visible Compose destination",
      summary:
        "Render the real NavHost, trigger the semantic action, and assert the destination UI.",
      language: "kotlin",
      filename: "AppNavHostTest.kt",
      code: `@Test fun opensAdaProfile() {
    composeTestRule.setContent { AppNavHost() }

    composeTestRule.onNodeWithContentDescription("Open profile")
        .performClick()

    composeTestRule.onNodeWithText("Profile: Ada")
        .assertIsDisplayed()
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both tests start with a user intent and prove the screen the user can see. React Navigation commonly needs timers flushed for navigation animations; Compose queries the semantics tree exposed by the destination.",
    },
  ],
  mentalModel:
    "Navigation is an observable application contract: given a start destination and user intent, the correct destination renders with safe arguments. Prefer that contract over assertions about a navigator's private stack operations.",
  differences: [
    "React Navigation's test setup renders a navigation container or static navigation tree and may require fake timers; Compose UI tests render the NavHost and interact through semantic nodes.",
    "A Compose route should carry a stable identifier, then the destination loads authorized current data. Do not treat a full object passed through a route as the source of truth.",
  ],
  commonMistakes: [
    "Testing only NavController.navigate calls, which proves a wiring detail but not that the target screen can render its arguments.",
    "Using visible text as the only selector for an icon action instead of giving the action a stable content description or test tag.",
  ],
  productionNotes: [
    "Cover the smallest end-to-end path for each critical flow: start destination, user action, destination content, and one invalid or missing-argument path.",
    "Keep deep-link parsing and authorization decisions outside reusable destination UI, then test cold-start and restored-task behavior at the app boundary.",
  ],
} as const;
