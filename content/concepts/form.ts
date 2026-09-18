export const formConcept = {
  id: "form",
  slug: "form",
  title: "Form State and Validation",
  description:
    "Coordinate controlled fields, validation, and submission state without coupling reusable inputs to a screen.",
  category: "interaction",
  order: 36,
  aliases: ["form validation", "submit state", "field errors"],
  keywords: ["TextInput", "TextField", "validation", "submit"],
  implementations: {
    "react-native": {
      name: "Controlled form state",
      summary:
        "The screen owns field values, validation, and the submit event.",
      language: "tsx",
      filename: "LoginForm.tsx",
      code: `function LoginForm() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return <Button title="Continue" disabled={!isValid} onPress={() => signIn(email)} />;
}`,
    },
    kotlin: {
      name: "Hoisted form state",
      summary:
        "The screen derives validation from field state and emits a submit intent.",
      language: "kotlin",
      filename: "LoginForm.kt",
      code: `@Composable
fun LoginForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = email.contains("@")

    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both keep field values as state, derive validation from those values, and send a submit event to the state owner.",
    },
  ],
  mentalModel:
    "A form is a small state machine. Keep reusable fields focused on value and events; let the screen or ViewModel own validation, submission, and server errors.",
  differences: [
    "Compose uses rememberSaveable when a field should survive configuration changes.",
    "Compose state hoisting makes a stateless field API natural without a separate controller pattern.",
  ],
  commonMistakes: [
    "Storing a derived isValid flag separately from the fields or mixing server errors into a generic input component.",
  ],
  productionNotes: [
    "Model submitting, success, and failure explicitly, and make retry or correction paths accessible.",
  ],
} as const;
