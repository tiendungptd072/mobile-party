function pair(
  name: string,
  reactNativeCode: string,
  kotlinCode: string,
  filenames: readonly [string, string],
) {
  return {
    "react-native": {
      name,
      summary: `TypeScript implementation for ${name.toLowerCase()}.`,
      language: filenames[0].endsWith(".tsx") ? "tsx" : "typescript",
      filename: filenames[0],
      code: reactNativeCode,
    },
    kotlin: {
      name,
      summary: `Kotlin implementation for ${name.toLowerCase()}.`,
      language: "kotlin",
      filename: filenames[1],
      code: kotlinCode,
    },
  } as const;
}

export const kotlinBridgeStageExamples = {
  "null-safety": {
    basic: pair(
      "Explicit nullable value",
      `function avatarUrl(user: User | null): string {
  return user?.avatarUrl ?? fallbackAvatar;
}`,
      `fun avatarUrl(user: User?): String {
    return user?.avatarUrl ?: fallbackAvatar
}`,
      ["avatar-url.ts", "AvatarUrl.kt"],
    ),
    applied: pair(
      "Validate at the boundary",
      `function openProfile(params: RouteParams) {
  const id = params.userId;
  if (!id) return showInvalidLink();
  navigate("Profile", { id });
}`,
      `fun openProfile(params: RouteParams) {
    val id = params.userId ?: return showInvalidLink()
    navigate(Profile(id))
}`,
      ["open-profile.ts", "OpenProfile.kt"],
    ),
    production: pair(
      "Normalize a nullable DTO",
      `function toUser(dto: UserDto): User {
  const name = dto.name?.trim();
  if (!name) throw new InvalidUserError(dto.id);
  return { id: dto.id, name, avatarUrl: dto.avatarUrl ?? null };
}`,
      `fun UserDto.toDomain(): User {
    val validName = name?.trim()?.takeIf(String::isNotEmpty)
        ?: throw InvalidUserException(id)
    return User(id = id, name = validName, avatarUrl = avatarUrl)
}`,
      ["user-mapper.ts", "UserMapper.kt"],
    ),
  },
  "data-classes": {
    basic: pair(
      "Immutable value update",
      `type User = Readonly<{ id: string; name: string }>;
const renamed = { ...user, name: "Linh" };`,
      `data class User(val id: String, val name: String)
val renamed = user.copy(name = "Linh")`,
      ["user.ts", "User.kt"],
    ),
    applied: pair(
      "Nested state update",
      `const updated = {
  ...state,
  users: state.users.map((user) =>
    user.id === id ? { ...user, selected: true } : user,
  ),
};`,
      `val updated = state.copy(
    users = state.users.map { user ->
        if (user.id == id) user.copy(selected = true) else user
    },
)`,
      ["users-reducer.ts", "UsersState.kt"],
    ),
    production: pair(
      "Read-only UI model",
      `type ProfileUiModel = Readonly<{
  id: string;
  displayName: string;
  tags: readonly string[];
}>;

const uiModel = toProfileUiModel(profile);`,
      `data class ProfileUiModel(
    val id: String,
    val displayName: String,
    val tags: List<String>,
)

val uiModel = profile.toUiModel()`,
      ["profile-ui-model.ts", "ProfileUiModel.kt"],
    ),
  },
  "sealed-types": {
    basic: pair(
      "Closed UI state",
      `type State =
  | { status: "loading" }
  | { status: "ready"; user: User };

return state.status === "loading" ? <Spinner /> : <Profile user={state.user} />;`,
      `sealed interface State {
    data object Loading : State
    data class Ready(val user: User) : State
}

when (state) {
    State.Loading -> Spinner()
    is State.Ready -> Profile(state.user)
}`,
      ["profile-state.tsx", "ProfileState.kt"],
    ),
    applied: pair(
      "Variant-specific payload",
      `type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "failed"; message: string }
  | { status: "succeeded"; userId: string };`,
      `sealed interface SubmitState {
    data object Idle : SubmitState
    data object Submitting : SubmitState
    data class Failed(val message: String) : SubmitState
    data class Succeeded(val userId: String) : SubmitState
}`,
      ["submit-state.ts", "SubmitState.kt"],
    ),
    production: pair(
      "Exhaustive state rendering",
      `function renderState(state: SubmitState): ReactNode {
  switch (state.status) {
    case "idle": return <Form />;
    case "submitting": return <Spinner />;
    case "failed": return <ErrorPanel message={state.message} />;
    case "succeeded": return <Success userId={state.userId} />;
    default: return assertNever(state);
  }
}`,
      `@Composable
fun SubmitContent(state: SubmitState) = when (state) {
    SubmitState.Idle -> Form()
    SubmitState.Submitting -> Spinner()
    is SubmitState.Failed -> ErrorPanel(state.message)
    is SubmitState.Succeeded -> Success(state.userId)
}`,
      ["submit-content.tsx", "SubmitContent.kt"],
    ),
  },
  "collection-transforms": {
    basic: pair(
      "Filter and project",
      `const names = users
  .filter((user) => user.isActive)
  .map((user) => user.displayName);`,
      `val names = users
    .filter(User::isActive)
    .map(User::displayName)`,
      ["active-users.ts", "ActiveUsers.kt"],
    ),
    applied: pair(
      "Drop invalid entries",
      `const usersById = new Map(
  responses
    .map(parseUser)
    .filter((user): user is User => user !== null)
    .map((user) => [user.id, user]),
);`,
      `val usersById = responses
    .mapNotNull(::parseUser)
    .associateBy(User::id)`,
      ["users-by-id.ts", "UsersById.kt"],
    ),
    production: pair(
      "Avoid unnecessary intermediate work",
      `const visibleNames = users.reduce<string[]>((result, user) => {
  if (user.isActive && matchesQuery(user, query)) {
    result.push(user.displayName);
  }
  return result;
}, []);`,
      `val visibleNames = users.asSequence()
    .filter(User::isActive)
    .filter { matchesQuery(it, query) }
    .map(User::displayName)
    .toList()`,
      ["visible-users.ts", "VisibleUsers.kt"],
    ),
  },
  "lambdas-and-receivers": {
    basic: pair(
      "Typed event callback",
      `type OnSelect = (id: string) => void;

function UserRow({ user, onSelect }: { user: User; onSelect: OnSelect }) {
  return <Pressable onPress={() => onSelect(user.id)}><Text>{user.name}</Text></Pressable>;
}`,
      `typealias OnSelect = (String) -> Unit

@Composable
fun UserRow(user: User, onSelect: OnSelect) {
    Row(Modifier.clickable { onSelect(user.id) }) { Text(user.name) }
}`,
      ["UserRow.tsx", "UserRow.kt"],
    ),
    applied: pair(
      "Builder callback",
      `const request = buildRequest((builder) => {
  builder.header("Accept", "application/json");
  builder.timeout(5_000);
});`,
      `val request = buildRequest {
    header("Accept", "application/json")
    timeout(5.seconds)
}`,
      ["request-builder.ts", "RequestBuilder.kt"],
    ),
    production: pair(
      "Capability-scoped UI slot",
      `function ActionBar({ renderActions }: {
  renderActions: (context: { disabled: boolean }) => ReactNode;
}) {
  return <View>{renderActions({ disabled: false })}</View>;
}`,
      `@Composable
fun ActionBar(
    actions: @Composable RowScope.(enabled: Boolean) -> Unit,
) {
    Row { actions(true) }
}`,
      ["ActionBar.tsx", "ActionBar.kt"],
    ),
  },
  "extension-functions": {
    basic: pair(
      "Focused value helper",
      `function displayName(user: User): string {
  return user.nickname?.trim() || user.name;
}

const label = displayName(user);`,
      `fun User.displayName(): String =
    nickname?.trim()?.takeIf(String::isNotEmpty) ?: name

val label = user.displayName()`,
      ["display-name.ts", "DisplayName.kt"],
    ),
    applied: pair(
      "Boundary mapping extension",
      `function toDomain(dto: UserDto): User {
  return { id: dto.id, name: dto.name.trim() };
}`,
      `fun UserDto.toDomain(): User = User(
    id = id,
    name = name.trim(),
)`,
      ["user-mapper.ts", "UserMapper.kt"],
    ),
    production: pair(
      "Explicit dependency for effectful work",
      `function loadAvatar(user: User, images: ImageRepository) {
  return images.load(user.avatarUrl);
}`,
      `suspend fun User.loadAvatar(images: ImageRepository): Image {
    return images.load(avatarUrl)
}`,
      ["load-avatar.ts", "LoadAvatar.kt"],
    ),
  },
  generics: {
    basic: pair(
      "Generic container",
      `type Page<T> = {
  items: readonly T[];
  nextCursor: string | null;
};`,
      `data class Page<T>(
    val items: List<T>,
    val nextCursor: String?,
)`,
      ["page.ts", "Page.kt"],
    ),
    applied: pair(
      "Constrained identifier",
      `function indexById<T extends { id: string }>(items: readonly T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item] as const));
}`,
      `interface Identifiable { val id: String }

fun <T : Identifiable> List<T>.indexById(): Map<String, T> {
    return associateBy { it.id }
}`,
      ["index-by-id.ts", "IndexById.kt"],
    ),
    production: pair(
      "Covariant result contract",
      `type AppResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };

async function loadUser(): Promise<AppResult<User>> {
  return repository.loadUser();
}`,
      `sealed interface AppResult<out T> {
    data class Success<T>(val value: T) : AppResult<T>
    data class Failure(val error: AppError) : AppResult<Nothing>
}

suspend fun loadUser(): AppResult<User> = repository.loadUser()`,
      ["app-result.ts", "AppResult.kt"],
    ),
  },
} as const;
