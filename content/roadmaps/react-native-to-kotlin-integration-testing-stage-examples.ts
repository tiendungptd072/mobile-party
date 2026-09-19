export const integrationTestingStageExamples = {
  "navigation-testing": {
    basic: {
      "react-native": {
        name: "Open the destination from an action",
        summary:
          "The test checks what the user sees after pressing the action.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        code: `const Navigation = createStaticNavigation(AppStack);
const user = userEvent.setup();
await render(<Navigation />);
await user.press(screen.getByRole("button", { name: "Open profile" }));
expect(screen.getByText("Profile: Ada")).toBeVisible();`,
      },
      kotlin: {
        name: "Open the destination from a semantic action",
        summary: "The real NavHost renders the destination UI after the click.",
        language: "kotlin",
        filename: "AppNavHostTest.kt",
        code: `composeTestRule.setContent { AppNavHost() }
composeTestRule.onNodeWithContentDescription("Open profile")
    .performClick()
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()`,
      },
    },
    applied: {
      "react-native": {
        name: "Flush navigation timers",
        summary:
          "Fake timers make the test deterministic when navigation schedules animation work.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        code: `jest.useFakeTimers();
await user.press(screen.getByRole("button", { name: "Open profile" }));
await act(() => jest.runAllTimers());
expect(screen.getByText("Profile: Ada")).toBeVisible();`,
      },
      kotlin: {
        name: "Prove the route ID reaches the screen",
        summary:
          "The destination loads by ID rather than receiving a stale object.",
        language: "kotlin",
        filename: "ProfileRouteTest.kt",
        code: `composeTestRule.setContent { AppNavHost(startProfileId = "ada") }
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()`,
      },
    },
    production: {
      "react-native": {
        name: "Exercise an invalid link state",
        summary: "An unknown profile remains a recoverable visible state.",
        language: "tsx",
        filename: "AppNavigator.test.tsx",
        code: `await render(<AppNavigator initialUrl="myapp://profiles/missing" />);
expect(screen.getByText("Profile unavailable")).toBeVisible();`,
      },
      kotlin: {
        name: "Exercise a restored destination",
        summary: "A restored route still resolves current authorized data.",
        language: "kotlin",
        filename: "ProfileRouteTest.kt",
        code: `composeTestRule.setContent { AppNavHost(startProfileId = "missing") }
composeTestRule.onNodeWithText("Profile unavailable")
    .assertIsDisplayed()`,
      },
    },
  },
  "background-work-testing": {
    basic: {
      "react-native": {
        name: "Test unique scheduling with a fake",
        summary: "Two calls still schedule only one named sync operation.",
        language: "typescript",
        filename: "sync-scheduler.test.ts",
        code: `await schedulePendingSync(scheduler);
await schedulePendingSync(scheduler);
expect(scheduler.uniqueWork).toHaveLength(1);`,
      },
      kotlin: {
        name: "Test worker logic directly",
        summary: "A worker returns retry for a controlled transient failure.",
        language: "kotlin",
        filename: "SyncWorkerTest.kt",
        code: `val worker = TestListenableWorkerBuilder<SyncWorker>(context).build()
assertEquals(ListenableWorker.Result.retry(), worker.doWork())`,
      },
    },
    applied: {
      "react-native": {
        name: "Classify retryable failures",
        summary:
          "The scheduler sees a retry only for a transient transport failure.",
        language: "typescript",
        filename: "sync-policy.test.ts",
        code: `expect(toSyncOutcome(new NetworkError())).toBe("retry");
expect(toSyncOutcome(new ValidationError())).toBe("failure");`,
      },
      kotlin: {
        name: "Classify Worker results",
        summary:
          "The worker maps transient and permanent failures to distinct results.",
        language: "kotlin",
        filename: "SyncWorkerTest.kt",
        code: `assertEquals(Result.retry(), runWorker(NetworkError()))
assertEquals(Result.failure(), runWorker(ValidationError()))`,
      },
    },
    production: {
      "react-native": {
        name: "Keep native integration narrow",
        summary:
          "App tests verify the request contract; one device test proves the native bridge registration.",
        language: "typescript",
        filename: "sync-scheduler.test.ts",
        code: `expect(toWorkRequest(accountId)).toEqual({
  uniqueName: "pending-sync",
  network: "connected",
});`,
      },
      kotlin: {
        name: "Drive a WorkManager constraint",
        summary: "The test driver releases network work without real waiting.",
        language: "kotlin",
        filename: "SyncWorkManagerTest.kt",
        code: `WorkManagerTestInitHelper.initializeTestWorkManager(context)
val request = OneTimeWorkRequestBuilder<SyncWorker>().build()
workManager.enqueue(request).result.get()
WorkManagerTestInitHelper.getTestDriver(context)!!
    .setAllConstraintsMet(request.id)`,
      },
    },
  },
} as const;
