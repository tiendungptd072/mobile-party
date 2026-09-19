export const uiBehaviorTestingConcept = {
  id: "ui-behavior-testing",
  slug: "ui-behavior-testing",
  title: "UI Behavior Testing",
  description:
    "Test rendered user behavior and outcomes across React Native and Compose without coupling tests to component internals.",
  category: "testing",
  order: 50,
  aliases: [
    "React Native Testing Library",
    "Compose UI test",
    "onNodeWithText",
    "user behavior",
  ],
  keywords: ["testing", "UI test", "semantics", "interaction", "assertion"],
  implementations: {
    "react-native": {
      name: "Test a user-visible interaction",
      summary:
        "Render the screen, trigger a press, and assert what the user can observe.",
      language: "tsx",
      filename: "Counter.test.tsx",
      code: `render(<Counter />);
fireEvent.press(screen.getByRole("button", { name: "Add" }));
expect(screen.getByText("Count: 1")).toBeTruthy();`,
    },
    kotlin: {
      name: "Test a semantic interaction",
      summary:
        "Compose tests find semantic nodes, perform an action, and assert visible output.",
      language: "kotlin",
      filename: "CounterTest.kt",
      code: `composeTestRule.setContent { Counter() }
composeTestRule.onNodeWithText("Add").performClick()
composeTestRule.onNodeWithText("Count: 1").assertExists()`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can test the rendered UI from a user's perspective, while React Native component test tools query rendered React Native output and Compose UI tests query the semantics tree.",
    },
  ],
  mentalModel:
    "Arrange a focused state, perform the action a user would take, then assert the observable result. Keep screen content separate from state owners so rendering and intent contracts can be tested without network or navigation infrastructure.",
  differences: [
    "React Native component tests run in JavaScript and do not validate native platform code; Compose UI tests run against Android UI semantics.",
    "Compose test selectors often derive from semantics; testTag is a fallback selector, not the primary assertion when visible text or accessible role expresses the behavior.",
  ],
  commonMistakes: [
    "Asserting private component state, ViewModel calls, or a large snapshot instead of the visible outcome of one interaction.",
  ],
  productionNotes: [
    "Control asynchronous completion in screen tests so pending and completed states can be asserted without sleeps. Keep a small number of device-level end-to-end tests for critical flows such as authentication or payment.",
  ],
} as const;
