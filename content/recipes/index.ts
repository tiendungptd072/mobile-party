export const rawRecipes = [
  {
    slug: "api-request",
    title: "API Request",
    description: "Load remote data with explicit loading and error states.",
    category: "networking",
    keywords: ["fetch", "HTTP", "loading", "error state"],
    flow: ["Start request", "Show loading", "Handle response", "Render result"],
    implementations: {
      "react-native": {
        summary: "Fetch and update a discriminated UI state.",
        language: "tsx",
        filename: "useProfile.ts",
        code: `async function loadProfile() {
  setState({ status: "loading" });
  try {
    const response = await fetch("/profile");
    if (!response.ok) throw new Error("HTTP " + response.status);
    const profile = await response.json();
    setState({ status: "success", profile });
  } catch {
    setState({ status: "error", message: "Could not load profile" });
  }
}`,
      },
      kotlin: {
        summary: "Launch work from a ViewModel and expose immutable UI state.",
        language: "kotlin",
        filename: "ProfileViewModel.kt",
        code: `fun loadProfile() = viewModelScope.launch {
    uiState.value = ProfileState.Loading
    try {
        uiState.value = ProfileState.Success(repository.profile())
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (error: Exception) {
        uiState.value = ProfileState.Error("Could not load profile")
    }
}`,
      },
    },
    architectureNotes: [
      "Keep transport details behind a repository boundary.",
      "Model loading, success, and failure explicitly; preserve coroutine cancellation and show safe user-facing error text.",
    ],
  },
  {
    slug: "refresh-token",
    title: "Refresh Token",
    description:
      "Retry an authenticated request after renewing an expired access token.",
    category: "authentication",
    keywords: ["authentication", "401", "access token", "retry"],
    flow: ["Send request", "Receive 401", "Refresh token", "Retry once"],
    implementations: {
      "react-native": {
        summary: "Centralize retry policy around a fetch wrapper.",
        language: "tsx",
        filename: "authenticatedFetch.ts",
        code: `async function authenticatedFetch(url: string) {
  let response = await fetch(url, { headers: authHeaders() });
  if (response.status === 401) {
    await refreshAccessToken();
    response = await fetch(url, { headers: authHeaders() });
  }
  return response;
}`,
      },
      kotlin: {
        summary: "Use an OkHttp authenticator to refresh and retry once.",
        language: "kotlin",
        filename: "TokenAuthenticator.kt",
        code: `override fun authenticate(route: Route?, response: Response): Request? {
    if (responseCount(response) >= 2) return null
    val token = tokenRepository.refresh() ?: return null
    return response.request.newBuilder()
        .header("Authorization", "Bearer $token")
        .build()
}`,
      },
    },
    architectureNotes: [
      "Refresh only once to prevent retry loops.",
      "Treat refresh failure as a sign-out transition.",
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Append the next page while keeping existing results stable.",
    category: "lists",
    keywords: ["infinite scroll", "cursor", "load more", "list"],
    flow: ["Render items", "Reach end", "Load next cursor", "Append page"],
    implementations: {
      "react-native": {
        summary: "Guard cursor requests and recover from an append failure.",
        language: "tsx",
        filename: "Feed.tsx",
        code: `const loadingRef = useRef(false);

async function loadNextPage() {
  if (loadingRef.current || !nextCursor) return;
  loadingRef.current = true;
  setIsLoading(true);
  setAppendError(null);
  try {
    const page = await fetchPage(nextCursor);
    setItems((current) => [...current, ...page.items]);
    setNextCursor(page.nextCursor);
  } catch {
    setAppendError("Could not load more posts");
  } finally {
    loadingRef.current = false;
    setIsLoading(false);
  }
}`,
      },
      kotlin: {
        summary: "Let Paging compose list state and append loading UI.",
        language: "kotlin",
        filename: "FeedScreen.kt",
        code: `val posts = viewModel.posts.collectAsLazyPagingItems()
LazyColumn {
    items(posts.itemCount) { index ->
        posts[index]?.let { PostRow(it) }
    }
    when (posts.loadState.append) {
        is LoadState.Loading -> item { CircularProgressIndicator() }
        is LoadState.Error -> item { RetryButton(onClick = posts::retry) }
        else -> Unit
    }
}`,
      },
    },
    architectureNotes: [
      "Use stable cursors rather than changing offsets.",
      "Guard duplicate append requests and keep existing rows visible when append fails so users can retry.",
    ],
  },
  {
    slug: "secure-storage",
    title: "Secure Storage",
    description:
      "Persist sensitive credentials using platform-backed encrypted storage.",
    category: "storage",
    keywords: ["keychain", "keystore", "credentials", "encryption"],
    flow: [
      "Receive credential",
      "Encrypt at rest",
      "Read when needed",
      "Clear on sign-out",
    ],
    implementations: {
      "react-native": {
        summary: "Use a secure-storage adapter rather than AsyncStorage.",
        language: "tsx",
        filename: "credentialStore.ts",
        code: `export async function saveToken(token: string) {
  await secureStorage.setItem("access-token", token);
}
export async function clearToken() {
  await secureStorage.removeItem("access-token");
}`,
      },
      kotlin: {
        summary:
          "Hide Keystore-backed encryption behind a credential-store interface.",
        language: "kotlin",
        filename: "CredentialStore.kt",
        code: `interface CredentialStore {
    suspend fun saveToken(token: String)
    suspend fun readToken(): String?
    suspend fun clear()
}

// The Android implementation encrypts values with a Keystore-held key.`,
      },
    },
    architectureNotes: [
      "Do not store credentials in ordinary preferences.",
      "Clear credentials from one sign-out boundary.",
    ],
  },
  {
    slug: "biometric-login",
    title: "Biometric Login",
    description: "Gate a locally stored credential with a biometric prompt.",
    category: "authentication",
    keywords: ["Face ID", "fingerprint", "BiometricPrompt", "sign in"],
    flow: [
      "Request biometric check",
      "Verify user",
      "Read credential",
      "Resume session",
    ],
    implementations: {
      "react-native": {
        summary: "Keep biometric prompting separate from session restoration.",
        language: "tsx",
        filename: "resumeSession.ts",
        code: `async function resumeSession() {
  const verified = await biometrics.authenticate("Unlock your session");
  if (!verified) return false;
  const token = await credentialStore.readToken();
  return Boolean(token);
}`,
      },
      kotlin: {
        summary: "Continue only from BiometricPrompt's success callback.",
        language: "kotlin",
        filename: "SessionGate.kt",
        code: `val prompt = BiometricPrompt(
    activity,
    object : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationSucceeded(
            result: BiometricPrompt.AuthenticationResult,
        ) {
            viewModel.resumeSession()
        }

        override fun onAuthenticationError(code: Int, message: CharSequence) {
            viewModel.showLockedState()
        }
    },
)
prompt.authenticate(promptInfo)`,
      },
    },
    architectureNotes: [
      "Biometrics verify local presence, not server identity.",
      "Provide a recovery path for cancellation or unavailable hardware.",
    ],
  },
  {
    slug: "deep-links",
    title: "Deep Links",
    description: "Route an incoming URL to the correct in-app destination.",
    category: "navigation",
    keywords: ["universal links", "app links", "URL", "navigation"],
    flow: ["Receive URL", "Parse route", "Validate data", "Navigate safely"],
    implementations: {
      "react-native": {
        summary:
          "Map URL patterns to navigation screens through one configuration.",
        language: "tsx",
        filename: "linking.ts",
        code: `export const linking = {
  prefixes: ["mobileparty://", "https://mobile.party"],
  config: { screens: { Profile: "profiles/:profileId" } },
};`,
      },
      kotlin: {
        summary: "Declare the URI pattern beside the Navigation Compose route.",
        language: "kotlin",
        filename: "ProfileDestination.kt",
        code: `composable(
    route = "profile/{profileId}",
    deepLinks = listOf(
        navDeepLink { uriPattern = "mobileparty://profiles/{profileId}" },
        navDeepLink { uriPattern = "https://mobile.party/profiles/{profileId}" },
    ),
) { entry ->
    val profileId = entry.arguments?.getString("profileId")
        ?.takeIf(String::isNotBlank)
    if (profileId == null) InvalidLinkScreen()
    else ProfileScreen(profileId)
}`,
      },
    },
    architectureNotes: [
      "Validate path parameters before loading data.",
      "Keep external and in-app route definitions aligned.",
      "Register supported schemes and hosts in the Android manifest; declare and verify HTTPS App Links separately.",
    ],
  },
] as const;
