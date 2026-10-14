import type * as React from "react";
import type * as RN from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { StoreApi, UseBoundStore } from "zustand";

// Application fixtures only. Framework declarations come from installed packages.
declare global {
  type User = {
    id: string;
    name: string;
    nickname?: string;
    avatarUrl?: string | null;
    profile?: { name: string };
    isActive?: boolean;
    displayName?: string;
  };
  type Profile = { id: string; name: string };
  type Post = { id: string; title: string };
  type Item = { price: number };
  type Theme = "light" | "dark" | "system";
  type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
  type UserError = "offline" | "unknown";
  type ProfileError = { type: "offline" | "notFound" | "unknown" };
  type AppError = { kind: "network" | "unknown" };
  type SubmitState =
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "failed"; message: string }
    | { status: "succeeded"; userId: string };
  type ProfileState =
    | { status: "loading" }
    | { status: "error" | "unavailable" }
    | { status: "ready"; profile: Profile };
  type FeedState = { posts: Post[]; bookmarkedIds: ReadonlySet<string> };
  type ProfileRepository = { getProfile(id: string): Promise<Profile> };
  type FeedRepository = {
    subscribe(listener: () => void): () => void;
    getSnapshot(): Post[];
    refresh(): Promise<void>;
  };
  type ImageRepository = {
    load(url: string | null | undefined): Promise<void>;
  };
  type Destination =
    | { kind: "home" }
    | { kind: "invalid-link" }
    | { kind: "profile"; id: string };
  type RouteParams = { userId?: string };
  const navigation: NativeStackNavigationProp<{
    Profile: { userId: string };
    Post: { id: string };
    SignIn: undefined;
    EditProfile: undefined;
  }>;
  const user: User;
  const profile: Profile;
  const post: Post;
  const users: User[];
  const posts: Post[];
  const name: string;
  const title: string;
  const description: string;
  const userId: string;
  const id: string;
  const accountId: string;
  const postId: string;
  const query: string;
  const roomId: string;
  const token: string;
  const refreshToken: string;
  const fallbackAvatar: string;
  const photo: RN.ImageSourcePropType;
  const photos: { id: string; url: string }[];
  const columns: number;
  const isFavorite: boolean;
  const hasUnsavedChanges: boolean;
  const showDiscardDialog: boolean;
  const showFilters: boolean;
  const expanded: boolean;
  const canSave: boolean;
  const isSaving: boolean;
  const isLoading: boolean;
  const preference: Theme;
  const scheme: "light" | "dark";
  const spacing: { lg: number; md: number };
  const radius: { md: number };
  const styles: Record<
    | "panel"
    | "card"
    | "row"
    | "avatarContainer"
    | "bottomEnd"
    | "overlay"
    | "media"
    | "center"
    | "content",
    RN.ViewStyle & RN.TextStyle
  >;
  const opacity: RN.Animated.Value;
  const scale: RN.Animated.Value;
  const SpacingContext: React.Context<number>;
  type ThemeTokens = {
    background: string;
    surface: string;
    onSurface: string;
    accent: string;
  };
  const ThemeContext: React.Context<ThemeTokens>;
  const lightTheme: ThemeTokens;
  const darkTheme: ThemeTokens;
  const Avatar: React.ComponentType<{ user?: User }>;
  const HeartIcon: React.ComponentType<{ filled: boolean }>;
  const TrashIcon: React.ComponentType;
  const PlayIcon: React.ComponentType;
  const Icon: React.ComponentType;
  const MoreButton: React.ComponentType;
  const IconButton: React.ComponentType<{ icon?: string; name?: string }>;
  const OnlineBadge: React.ComponentType<{
    style?: RN.StyleProp<RN.ViewStyle>;
  }>;
  const Card: React.ComponentType;
  const ProfileCard: React.ComponentType<{ profile?: Profile; user?: User }>;
  const ProfileContent: React.ComponentType;
  const ProfileHeader: React.ComponentType;
  const ProfileDetails: React.ComponentType;
  const HeaderActions: React.ComponentType;
  const MessageList: React.ComponentType;
  const Filters: React.ComponentType;
  const Spinner: React.ComponentType;
  const LoadingView: React.ComponentType;
  const EmptyView: React.ComponentType<{ onRetry?: () => void }>;
  const ProfileView: React.ComponentType<{ profile: Profile }>;
  const ProfileList: React.ComponentType<{ profiles: Profile[] }>;
  const Content: React.ComponentType<{ data: Profile }>;
  const PostRow: React.ComponentType<{ post: Post }>;
  const EditablePost: React.ComponentType<{ post: Post }>;
  const UserRow: React.ComponentType<{
    user?: User;
    name?: string;
    onPress?: () => void;
  }>;
  const PhotoTile: React.ComponentType<{ photo: { id: string; url: string } }>;
  const DraftEditor: React.ComponentType<{ item: Post }>;
  const TwoPaneMail: React.ComponentType<{ selectedId?: string | null }>;
  const SinglePaneMail: typeof TwoPaneMail;
  const MailScreen: React.ComponentType<{
    selectedId: string | null;
    onSelect(id: string | null): void;
  }>;
  const SettingsGrid: React.ComponentType;
  const SettingsList: React.ComponentType;
  const AppNavigator: React.ComponentType<{ initialUrl?: string }>;
  const AuthNavigator: React.ComponentType;
  const SplashScreen: React.ComponentType;
  const InvalidLinkScreen: React.ComponentType;
  const AuthorizedProfileRoute: React.ComponentType<{ userId: string }>;
  const CheckoutProvider: React.ComponentType<React.PropsWithChildren>;
  const CartScreen: React.ComponentType;
  const PaymentScreen: React.ComponentType;
  const EditProfileRoute: React.ComponentType;
  const Form: React.ComponentType;
  const Success: React.ComponentType<{ userId: string }>;
  const CameraPicker: React.ComponentType;
  const ErrorPanel: React.ComponentType<{
    message: string;
    onRetry?: () => void;
  }>;
  const ErrorView: typeof ErrorPanel;
  const DiscardDialog: React.ComponentType<{
    visible: boolean;
    onDiscard(): void;
    onKeepEditing(): void;
  }>;
  const SaveButton: React.ComponentType<{
    canSave: boolean;
    isSaving: boolean;
    onSave(): void;
  }>;
  const AppendState: React.ComponentType<{
    value: "idle" | "loading" | "error";
  }>;
  const TagEditor: React.ComponentType<{
    tags: string[];
    onAdd(tag: string): void;
  }>;
  const TotalLabel: React.ComponentType<{ total: number }>;
  const Counter: React.ComponentType<{
    count?: number;
    onIncrement?: () => void;
  }>;
  const ProfileForm: React.ComponentType<{
    name: string;
    onRename(name: string): void;
  }>;
  function onToggle(): void;
  function onDelete(): void;
  function onSave(): Promise<void>;
  function onOpen(): void;
  function onArchive(): void;
  function onDrop(): void;
  function onDrag(offset: number): void;
  function onSelect(id: string): void;
  function onChange(state: RN.AppStateStatus): void;
  function onSearch(query: string): void;
  function onTimeout(): void;
  function refresh(): Promise<void>;
  function reload(): void;
  function loadMore(): Promise<void>;
  function saveProfile(): Promise<void>;
  function confirmDiscard(): boolean;
  function showUnavailable(): void;
  function showInvalidLink(): void;
  function openCamera(): void;
  function openLibrary(): void;
  function requestCamera(): Promise<void>;
  function reportError(error: unknown): void;
  function setName(value: string): void;
  function setIsSaving(value: boolean): void;
  function setHasError(value: boolean): void;
  function setShowDiscardDialog(value: boolean): void;
  function setOffset(value: number): void;
  function setRemindersEnabled(value: boolean): void;
  function setIsOnline(value: boolean): void;
  function setConnection(value: { isConnected: boolean | null }): void;
  const setItems: React.Dispatch<React.SetStateAction<Post[]>>;
  function setUser(user: User): void;
  const nextCursor: string | null;
  function setNextCursor(cursor: string | null): void;
  function setAppend(value: "idle" | "loading" | "error"): void;
  function setAppendError(value: string | null): void;
  function setIsLoading(value: boolean): void;
  function loadUser(id: string, signal: AbortSignal): Promise<User>;
  function loadProfile(id: string, signal: AbortSignal): Promise<Profile>;
  function fetchPage(
    cursor: string,
  ): Promise<{ items: Post[]; nextCursor: string | null }>;
  function byNewest(a: Post, b: Post): number;
  function parseDestination(url: string): Destination | null;
  function parseUserId(value: unknown): string | null;
  function parseAndValidateLink(
    url: string,
  ): { name: "Profile"; params: { userId: string } } | null;
  function navigate(destination: Destination): void;
  function mapUserError(error: unknown): UserError;
  function assertNever(value: never): never;
  function toFeedError(error: unknown): AppError;
  function toPost(dto: Post): Post;
  function toProfileUiModel(profile: Profile): {
    id: string;
    displayName: string;
    tags: readonly string[];
  };
  function matchesQuery(user: User, query: string): boolean;
  function selectSavedPosts(posts: Post[], ids: ReadonlySet<string>): Post[];
  const API_URL: string;
  class HttpError extends Error {
    constructor(status: number);
  }
  class InvalidUserError extends Error {
    constructor(id: string);
  }
  class OfflineError extends Error {}
  class NotFoundError extends Error {}
  class NetworkError extends Error {}
  class ValidationError extends Error {}
  class ApiClient {}
  const apiClient: ApiClient;
  class HttpProfileRepository implements ProfileRepository {
    constructor(client: ApiClient);
    getProfile(id: string): Promise<Profile>;
  }
  class FakeProfileRepository implements ProfileRepository {
    constructor(profile: Profile);
    getProfile(id: string): Promise<Profile>;
  }
  class FakeFeedRepository implements FeedRepository {
    constructor(posts?: Post[]);
    emit(posts: Post[]): void;
    subscribe(listener: () => void): () => void;
    getSnapshot(): Post[];
    refresh(): Promise<void>;
  }
  function useFeed(repository: FeedRepository): { items: Post[] };
  type Session =
    { status: "restoring" | "signedOut" } | { status: "signedIn"; user: User };
  function useSession(): Session;
  function setSession(session: Session): void;
  const credentialStore: {
    readRefreshToken(): Promise<string | null>;
    readToken(): Promise<string | null>;
    clear(): Promise<void>;
  };
  const auth: { refresh(token?: string): Promise<User> };
  let refreshPromise: Promise<User> | undefined;
  const biometrics: { authenticate(reason: string): Promise<boolean> };
  const secureStorage: {
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  };
  const storage: { setItem(key: string, value: string): Promise<void> };
  const sessionMutex: { runExclusive<T>(action: () => Promise<T>): Promise<T> };
  const sessionStore: StoreApi<Session>;
  const useSessionStore: UseBoundStore<
    StoreApi<{ user: User | null; signOut(): void }>
  >;
  const camera: { startPreview(): void; stopPreview(): void };
  const analytics: { trackVisible(): void };
  const chat: { connect(id: string): { start(): void; stop(): void } };
  const connectivity: {
    subscribe(listener: (online: boolean) => void): () => void;
  };
  const netInfo: {
    addEventListener(
      listener: (state: { isConnected: boolean | null }) => void,
    ): () => void;
  };
  const notifier: {
    show(id: string, title: string): Promise<void>;
    requestPermission(): Promise<boolean>;
    getInitialTarget(): Promise<{ postId: string } | null>;
  };
  const pendingLinks: {
    save(destination: { name: "Profile"; params: { userId: string } }): void;
  };
  const session: { isSignedIn(): boolean };
  const syncRepository: { syncPending(): Promise<void> };
  type PendingAction = {
    idempotencyKey: string;
    postId: string;
    desiredBookmark: boolean;
  };
  const action: { id: string; postId: string; desiredBookmark: boolean };
  const pendingActions: {
    enqueue(
      action:
        | PendingAction
        | {
            id: string;
            type: "bookmark";
            postId: string;
            desiredValue: boolean;
          },
    ): Promise<void>;
  };
  class FakeSyncScheduler {
    uniqueWork: { name: string; policy: "keep" }[];
    enqueue(): Promise<void>;
  }
  const scheduler: FakeSyncScheduler;
  function schedulePendingSync(scheduler: FakeSyncScheduler): Promise<void>;
  function toSyncOutcome(error: unknown): "retry" | "failure";
  function toWorkRequest(accountId: string): {
    uniqueName: string;
    network: string;
  };
  function buildRequest(
    configure: (builder: {
      header(name: string, value: string): void;
      timeout(ms: number): void;
    }) => void,
  ): unknown;
  const renderProduct: RN.ListRenderItem<{ name: string }>;
  const renderItem: RN.ListRenderItem<Post>;
  const initialFeed: FeedState;
  function reduceFeed(
    state: FeedState,
    event:
      | { type: "refreshed"; posts: Post[] }
      | { type: "bookmark-toggled"; id: string },
  ): FeedState;
  const postStore: StoreApi<Post[]>;
  const favoriteStore: StoreApi<ReadonlySet<string>>;
}
