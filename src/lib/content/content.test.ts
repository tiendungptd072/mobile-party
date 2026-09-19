import { describe, expect, test } from "bun:test";
import { rawConcepts } from "@content/concepts";
import {
  viConceptTranslations,
  viRecipeTranslations,
} from "@content/locales/vi";
import {
  findConceptByTerm,
  getConceptBySlug,
  getConcepts,
} from "@/lib/content/concepts";
import {
  getRoadmap,
  getRoadmapLessonLocation,
  getRoadmapLessonLocations,
} from "@/lib/content/roadmaps";
import {
  ContentValidationError,
  validateConcept,
  validateConcepts,
  validateRecipe,
  validateRoadmaps,
} from "@/lib/content/schema";
import { getTechnologies } from "@/lib/content/technologies";
import { getRecipeBySlug, getRecipes } from "@/lib/content/recipes";

describe("technology content", () => {
  test("uses the canonical technology order", () => {
    expect(getTechnologies().map((technology) => technology.id)).toEqual([
      "react-native",
      "flutter",
      "kotlin",
      "swiftui",
    ]);
  });
});

describe("concept content", () => {
  test("localizes educational prose without changing technical identifiers", () => {
    const english = getConceptBySlug("local-state", "en");
    const vietnamese = getConceptBySlug("local-state", "vi");

    expect(vietnamese?.title).toBe("State cục bộ");
    expect(vietnamese?.slug).toBe(english?.slug);
    expect(vietnamese?.implementations.kotlin?.code).toBe(
      english?.implementations.kotlin?.code,
    );
    expect(vietnamese?.references).toEqual(english?.references);
    expect(getConceptBySlug("null-safety", "vi")?.title).toBe("Null safety");
    for (const slug of [
      "null-safety",
      "data-classes",
      "sealed-types",
      "collection-transforms",
      "lambdas-and-receivers",
      "extension-functions",
      "generics",
      "recomposition",
      "snapshot-state",
      "ui-identity",
      "state-restoration",
      "stability-and-skipping",
      "modifier-order",
      "composition-local",
      "layout-constraints",
      "window-insets",
      "adaptive-layouts",
      "accessibility-semantics",
      "state-driven-animation",
      "gesture-abstractions",
      "runtime-permissions",
      "back-navigation",
      "ui-behavior-testing",
    ]) {
      const englishBridge = getConceptBySlug(slug, "en")!;
      const vietnameseBridge = getConceptBySlug(slug, "vi")!;

      expect(vietnameseBridge.description).not.toBe(englishBridge.description);
      expect(vietnameseBridge.mentalModel).not.toBe(englishBridge.mentalModel);
      expect(vietnameseBridge.differences).toHaveLength(
        englishBridge.differences.length,
      );
      expect(vietnameseBridge.references).toEqual(englishBridge.references);
    }
  });

  test("covers every concept in Vietnamese with equivalent structure and code", () => {
    const englishConcepts = getConcepts("en");
    expect(Object.keys(viConceptTranslations)).toHaveLength(
      englishConcepts.length,
    );
    for (const english of englishConcepts) {
      const vietnamese = getConceptBySlug(english.slug, "vi")!;
      expect(vietnamese.slug).toBe(english.slug);
      expect(vietnamese.relationships.map(({ type }) => type)).toEqual(
        english.relationships.map(({ type }) => type),
      );
      expect(vietnamese.differences).toHaveLength(english.differences.length);
      expect(vietnamese.commonMistakes).toHaveLength(
        english.commonMistakes.length,
      );
      expect(vietnamese.productionNotes).toHaveLength(
        english.productionNotes.length,
      );
      for (const technology of ["react-native", "kotlin"] as const) {
        expect(vietnamese.implementations[technology]?.code).toBe(
          english.implementations[technology]?.code,
        );
      }
    }
  });

  test("provides verified references for both roadmap technologies", () => {
    for (const concept of getConcepts()) {
      expect(concept.references.length).toBeGreaterThanOrEqual(2);
      expect(
        concept.references.some(
          (reference) => reference.technology === "react-native",
        ),
      ).toBe(true);
      expect(
        concept.references.some(
          (reference) => reference.technology === "kotlin",
        ),
      ).toBe(true);
    }
  });

  test("loads concepts in stable order", () => {
    const concepts = getConcepts();

    expect(concepts).toHaveLength(70);
    expect(concepts.map((concept) => concept.slug)).toEqual([
      "null-safety",
      "data-classes",
      "sealed-types",
      "collection-transforms",
      "lambdas-and-receivers",
      "extension-functions",
      "generics",
      "recomposition",
      "snapshot-state",
      "ui-identity",
      "state-restoration",
      "stability-and-skipping",
      "modifier-order",
      "composition-local",
      "android-build-variants",
      "android-app-entry",
      "android-resources",
      "android-intents",
      "android-activity-lifecycle",
      "component",
      "props",
      "children",
      "conditional-ui",
      "local-state",
      "derived-state",
      "global-state",
      "layout",
      "layout-constraints",
      "window-insets",
      "adaptive-layouts",
      "vertical-layout",
      "horizontal-layout",
      "stack",
      "list",
      "grid",
      "pagination",
      "button",
      "accessibility-semantics",
      "state-driven-animation",
      "gesture-abstractions",
      "text-input",
      "form",
      "side-effects",
      "lifecycle",
      "async",
      "coroutine-scopes",
      "flow-and-stateflow",
      "flow-composition",
      "loading-state",
      "error-handling",
      "navigation",
      "runtime-permissions",
      "back-navigation",
      "repository-boundary",
      "dependency-injection",
      "offline-first-data",
      "offline-pagination",
      "durable-background-work",
      "android-notifications",
      "state-owner-testing",
      "navigation-testing",
      "background-work-testing",
      "route-parameters",
      "deep-link",
      "api-request",
      "ui-behavior-testing",
      "local-storage",
      "secure-storage",
      "authentication",
      "theme",
    ]);
  });

  test("resolves API aliases without changing canonical slugs", () => {
    expect(findConceptByTerm("FlatList")?.slug).toBe("list");
    expect(findConceptByTerm("MUTABLESTATEOF")?.slug).toBe("local-state");
  });

  test("sorts raw concepts by order", () => {
    const component = rawConcepts.find(
      (concept) => concept.slug === "component",
    )!;
    const localState = rawConcepts.find(
      (concept) => concept.slug === "local-state",
    )!;
    const concepts = validateConcepts([localState, component]);

    expect(concepts.map((concept) => concept.slug)).toEqual([
      "component",
      "local-state",
    ]);
  });

  test("rejects duplicate slugs and aliases", () => {
    expect(() => validateConcepts([...rawConcepts, rawConcepts[0]])).toThrow(
      ContentValidationError,
    );
  });

  test("requires React Native and Kotlin implementations", () => {
    const invalidConcept = {
      ...rawConcepts[0],
      implementations: {
        kotlin: rawConcepts[0].implementations.kotlin,
      },
    };

    expect(() => validateConcept(invalidConcept)).toThrow(
      /missing required react-native implementation/,
    );
  });

  test("rejects unverified or insecure external references", () => {
    const insecureReference = {
      ...rawConcepts[0],
      references: [
        {
          ...rawConcepts[0].references[0],
          url: "http://example.com/docs",
        },
      ],
    };
    const invalidDate = {
      ...rawConcepts[0],
      references: [
        {
          ...rawConcepts[0].references[0],
          verifiedAt: "2026-02-31",
        },
      ],
    };

    expect(() => validateConcept(insecureReference)).toThrow(/HTTPS URL/);
    expect(() => validateConcept(invalidDate)).toThrow(/ISO date/);
  });
});

describe("roadmap content", () => {
  test("covers every React Native to Kotlin concept exactly once", () => {
    const roadmap = getRoadmap("react-native", "kotlin");
    const lessonSlugs = getRoadmapLessonLocations(roadmap!).map(
      ({ lesson }) => lesson.conceptSlug,
    );

    expect(new Set(lessonSlugs).size).toBe(lessonSlugs.length);
    expect([...lessonSlugs].sort()).toEqual(
      getConcepts()
        .map((concept) => concept.slug)
        .sort(),
    );
  });

  test("provides progressive code comparisons for expanded lessons", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    for (const { lesson } of getRoadmapLessonLocations(roadmap!)) {
      expect(lesson.stages).toHaveLength(3);
      expect(
        lesson.stages.every(
          (stage) =>
            stage.examples?.["react-native"]?.code &&
            stage.examples.kotlin?.code,
        ),
      ).toBe(true);
    }
  });

  test("teaches Android entry and localized resources before UI components", () => {
    const english = getRoadmap("react-native", "kotlin", "en")!;
    const vietnamese = getRoadmap("react-native", "kotlin", "vi")!;
    const entry = getRoadmapLessonLocation(
      english,
      "android-app-entry",
    )?.lesson;
    const resources = getRoadmapLessonLocation(
      english,
      "android-resources",
    )?.lesson;
    const basics = english.sections.find(
      (section) => section.id === "ui-basics",
    )!;

    expect(
      basics.lessons.slice(0, 6).map((lesson) => lesson.conceptSlug),
    ).toEqual([
      "android-build-variants",
      "android-app-entry",
      "android-resources",
      "android-intents",
      "android-activity-lifecycle",
      "component",
    ]);

    const build = getRoadmapLessonLocation(
      english,
      "android-build-variants",
    )?.lesson;
    const intents = getRoadmapLessonLocation(
      english,
      "android-intents",
    )?.lesson;
    expect(build?.stages[1].examples?.["react-native"]?.code).toContain(
      ":app:sourceSets",
    );
    expect(build?.stages[2].examples?.kotlin?.code).toContain(
      "apksigner verify --print-certs",
    );
    expect(intents?.stages[1].examples?.kotlin?.code).toContain(
      "Intent.createChooser",
    );
    expect(intents?.stages[2].examples?.kotlin?.code).toContain("onNewIntent");
    const activityLifecycle = getRoadmapLessonLocation(
      english,
      "android-activity-lifecycle",
    )?.lesson;
    expect(activityLifecycle?.stages[1].examples?.kotlin?.code).toContain(
      "onPauseOrDispose",
    );
    expect(activityLifecycle?.stages[2].examples?.kotlin?.code).toContain(
      "collectAsStateWithLifecycle",
    );

    expect(entry?.stages[0].examples?.["react-native"]?.code).toContain(
      "AppRegistry.registerComponent",
    );
    expect(entry?.stages[0].examples?.kotlin?.code).toContain("setContent");
    expect(resources?.stages[2].examples?.kotlin?.code).toContain(
      "pluralStringResource",
    );
    expect(getConceptBySlug("android-app-entry", "vi")?.title).toBe(
      "Điểm vào ứng dụng Android và Activity",
    );
    expect(
      getRoadmapLessonLocation(vietnamese, "android-resources")?.lesson
        .stages[2].examples?.kotlin?.code,
    ).toBe(resources?.stages[2].examples?.kotlin?.code);
  });

  test("keeps coroutine cancellation and Flow sharing explicit", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const scopes = getRoadmapLessonLocation(
      roadmap,
      "coroutine-scopes",
    )?.lesson;
    const flow = getRoadmapLessonLocation(
      roadmap,
      "flow-and-stateflow",
    )?.lesson;

    expect(scopes?.stages[2].examples?.["react-native"]?.code).toContain(
      "controller.signal.aborted",
    );
    expect(scopes?.stages[2].examples?.kotlin?.code).toContain(
      "catch (cancelled: CancellationException)",
    );
    expect(flow?.stages[0].examples?.kotlin?.code).toContain("flow {");
    expect(flow?.stages[2].examples?.kotlin?.code).toContain(
      "SharingStarted.WhileSubscribed",
    );
    expect(getConceptBySlug("flow-and-stateflow", "vi")?.title).toBe(
      "Flow và StateFlow",
    );
  });

  test("keeps data sources behind repositories and dependencies explicit", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const repository = getRoadmapLessonLocation(
      roadmap,
      "repository-boundary",
    )?.lesson;
    const injection = getRoadmapLessonLocation(
      roadmap,
      "dependency-injection",
    )?.lesson;

    expect(repository?.stages[1].examples?.kotlin?.code).toContain(
      "toDomain()",
    );
    expect(repository?.stages[2].examples?.kotlin?.code).toContain(
      "FakeProfileRepository",
    );
    expect(injection?.stages[1].examples?.kotlin?.code).toContain("@Binds");
    expect(injection?.stages[2].examples?.kotlin?.code).toContain(
      "@HiltViewModel",
    );
    expect(getConceptBySlug("dependency-injection", "vi")?.title).toBe(
      "Dependency injection và lifetime",
    );
  });

  test("keeps background sync durable and notification delivery permission-aware", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const work = getRoadmapLessonLocation(
      roadmap,
      "durable-background-work",
    )?.lesson;
    const notifications = getRoadmapLessonLocation(
      roadmap,
      "android-notifications",
    )?.lesson;

    expect(work?.stages[1].examples?.kotlin?.code).toContain(
      "enqueueUniqueWork",
    );
    expect(work?.stages[2].examples?.kotlin?.code).toContain("Result.retry()");
    expect(notifications?.stages[0].examples?.kotlin?.code).toContain(
      "NotificationChannel",
    );
    expect(notifications?.stages[1].examples?.kotlin?.code).toContain(
      "POST_NOTIFICATIONS",
    );
    expect(notifications?.stages[2].examples?.kotlin?.code).toContain(
      "PendingIntent.FLAG_IMMUTABLE",
    );
  });

  test("combines controlled sources and tests state owners with an active collector", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const flow = getRoadmapLessonLocation(roadmap, "flow-composition")?.lesson;
    const stateOwner = getRoadmapLessonLocation(
      roadmap,
      "state-owner-testing",
    )?.lesson;

    expect(flow?.stages[0].examples?.kotlin?.code).toContain("combine(");
    expect(flow?.stages[1].examples?.kotlin?.code).toContain("retryWhen");
    expect(flow?.stages[2].examples?.kotlin?.code).toContain("runTest");
    expect(stateOwner?.stages[1].examples?.kotlin?.code).toContain(
      "backgroundScope.launch",
    );
    expect(stateOwner?.stages[2].examples?.kotlin?.code).toContain(
      "inMemoryDatabaseBuilder",
    );
  });

  test("tests visible navigation and WorkManager policy without real waiting", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const navigation = getRoadmapLessonLocation(
      roadmap,
      "navigation-testing",
    )?.lesson;
    const backgroundWork = getRoadmapLessonLocation(
      roadmap,
      "background-work-testing",
    )?.lesson;

    expect(navigation?.stages[0].examples?.kotlin?.code).toContain(
      "AppNavHost",
    );
    expect(navigation?.stages[1].examples?.["react-native"]?.code).toContain(
      "runAllTimers",
    );
    expect(backgroundWork?.stages[0].examples?.kotlin?.code).toContain(
      "TestListenableWorkerBuilder",
    );
    expect(backgroundWork?.stages[2].examples?.kotlin?.code).toContain(
      "WorkManagerTestInitHelper",
    );
  });

  test("teaches bounded Compose sizing before width filling", () => {
    const english = getRoadmap("react-native", "kotlin", "en")!;
    const vietnamese = getRoadmap("react-native", "kotlin", "vi")!;
    const lesson = getRoadmapLessonLocation(
      english,
      "layout-constraints",
    )?.lesson;
    const vietnameseLesson = getRoadmapLessonLocation(
      vietnamese,
      "layout-constraints",
    )?.lesson;

    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "widthIn(max = 480.dp).fillMaxWidth()",
    );
    expect(vietnameseLesson?.title).toBe("Constraints và kích thước layout");
    expect(vietnameseLesson?.stages[2].examples?.kotlin?.code).toBe(
      lesson?.stages[2].examples?.kotlin?.code,
    );
  });

  test("keeps inset ownership at the screen boundary", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(roadmap, "window-insets")?.lesson;

    expect(lesson?.stages[1].examples?.kotlin?.code).toContain("imePadding()");
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "LazyColumn(contentPadding = contentPadding)",
    );
    expect(getConceptBySlug("window-insets", "vi")?.title).toBe(
      "Safe area, system bar và IME inset",
    );
  });

  test("keeps adaptive selection outside the pane arrangement", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "adaptive-layouts",
    )?.lesson;

    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "currentWindowAdaptiveInfo().windowSizeClass",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "viewModel.selectedId.collectAsStateWithLifecycle()",
    );
    expect(getConceptBySlug("adaptive-layouts", "vi")?.title).toBe(
      "Adaptive layout và kích thước cửa sổ",
    );
  });

  test("keeps accessibility semantics separate from test tags", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "accessibility-semantics",
    )?.lesson;

    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "IconToggleButton",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      'Modifier.testTag("profile-save")',
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      'contentDescription = "Save profile"',
    );
    expect(getConceptBySlug("accessibility-semantics", "vi")?.title).toBe(
      "Accessibility semantics và test tag",
    );
  });

  test("derives animation targets from current state", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "state-driven-animation",
    )?.lesson;

    expect(lesson?.stages[0].examples?.kotlin?.code).toContain(
      "animateFloatAsState",
    );
    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "AnimatedVisibility(visible = showFilters)",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "updateTransition(targetState = expanded",
    );
  });

  test("uses raw pointer input only for custom gestures", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "gesture-abstractions",
    )?.lesson;

    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      ".draggable(orientation = Orientation.Horizontal)",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "detectDragGesturesAfterLongPress",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "change.consume()",
    );
  });

  test("requests permissions from user intent with a usable fallback", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "runtime-permissions",
    )?.lesson;

    expect(lesson?.stages[0].examples?.kotlin?.code).toContain(
      "rememberLauncherForActivityResult",
    );
    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "Button(onClick = openLibrary)",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "Allow camera to scan a receipt",
    );
  });

  test("intercepts back only for unsaved changes", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(roadmap, "back-navigation")?.lesson;

    expect(lesson?.stages[0].examples?.kotlin?.code).toContain(
      "BackHandler(enabled = hasUnsavedChanges)",
    );
    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "navController::popBackStack",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "EditProfileContent",
    );
  });

  test("tests asynchronous UI transitions with user-visible assertions", () => {
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;
    const lesson = getRoadmapLessonLocation(
      roadmap,
      "ui-behavior-testing",
    )?.lesson;

    expect(lesson?.stages[0].examples?.kotlin?.code).toContain(
      'onNodeWithText("Add").performClick()',
    );
    expect(lesson?.stages[1].examples?.kotlin?.code).toContain(
      "ProfileScreen(state = ProfileUiState.Error",
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      'onNodeWithText("Saving…").assertExists()',
    );
    expect(lesson?.stages[2].examples?.kotlin?.code).toContain(
      "saveResult.complete(Unit)",
    );
  });

  test("cleans up authorized route loading when the route changes", () => {
    const lesson = getRoadmapLessonLocation(
      getRoadmap("react-native", "kotlin", "en")!,
      "route-parameters",
    )?.lesson;
    const code = lesson?.stages[2].examples?.["react-native"]?.code;
    expect(code).toContain("controller.signal.aborted");
    expect(code).toContain("return () => controller.abort()");
  });

  test("keeps lifecycle and concurrency-sensitive examples production-safe", () => {
    const roadmap = getRoadmap("react-native", "kotlin")!;
    const example = (
      slug: string,
      stageId: "basic" | "applied" | "production",
      technology: "react-native" | "kotlin",
    ) =>
      getRoadmapLessonLocation(roadmap, slug)?.lesson.stages.find(
        (stage) => stage.id === stageId,
      )?.examples?.[technology]?.code ?? "";

    expect(example("side-effects", "basic", "kotlin")).toContain(
      "LaunchedEffect(query, onSearch)",
    );
    expect(example("side-effects", "applied", "kotlin")).toContain(
      "rememberUpdatedState(onEvent)",
    );
    expect(example("button", "production", "react-native")).toContain(
      "saveInFlight.current",
    );
    expect(example("button", "production", "kotlin")).toContain(
      "saveJob?.isActive",
    );
    expect(example("form", "production", "kotlin")).toContain(
      "CancellationException",
    );
    expect(example("form", "production", "kotlin")).not.toContain(
      "runCatching",
    );
    expect(example("async", "production", "react-native")).toContain(
      "controller.abort()",
    );
    expect(example("async", "production", "kotlin")).toContain(
      "observeProfile(id)",
    );
    expect(example("pagination", "production", "react-native")).toContain(
      "initialPageParam",
    );
    expect(example("pagination", "production", "kotlin")).toContain(
      "loadState.append",
    );
    expect(example("secure-storage", "applied", "kotlin")).toContain(
      'Cipher.getInstance("AES/GCM/NoPadding")',
    );
  });

  test("localizes roadmap lessons with equivalent structure", () => {
    const english = getRoadmap("react-native", "kotlin", "en");
    const vietnamese = getRoadmap("react-native", "kotlin", "vi");

    expect(vietnamese?.sections[0].title).toBe("Cầu nối Kotlin");
    expect(vietnamese?.sections[1].title).toBe("Compose Runtime");
    expect(vietnamese?.sections[2].title).toBe("UI cơ bản");
    expect(getRoadmapLessonLocations(vietnamese!)).toHaveLength(
      getRoadmapLessonLocations(english!).length,
    );
    for (const { lesson: englishLesson } of getRoadmapLessonLocations(
      english!,
    )) {
      const vietnameseLesson = getRoadmapLessonLocation(
        vietnamese!,
        englishLesson.conceptSlug,
      )?.lesson;

      englishLesson.stages.forEach((stage, index) => {
        expect(
          vietnameseLesson?.stages[index].examples?.["react-native"]?.name,
        ).toBe(`Ví dụ ${vietnameseLesson?.stages[index].title}`);
        expect(vietnameseLesson?.stages[index].examples?.kotlin?.summary).toBe(
          vietnameseLesson?.stages[index].description,
        );
        expect(
          vietnameseLesson?.stages[index].examples?.["react-native"]?.code,
        ).toBe(stage.examples?.["react-native"]?.code);
        expect(vietnameseLesson?.stages[index].examples?.kotlin?.code).toBe(
          stage.examples?.kotlin?.code,
        );
      });
    }
  });

  test("loads a roadmap using canonical concept references", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    expect(roadmap?.sections).toHaveLength(10);
    expect(roadmap?.sections[0].lessons[0].conceptSlug).toBe("null-safety");
  });

  test("provides ordered lesson locations for navigation", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    expect(roadmap).toBeDefined();
    expect(
      getRoadmapLessonLocations(roadmap!).map(
        ({ lesson }) => lesson.conceptSlug,
      ),
    ).toEqual([
      "null-safety",
      "data-classes",
      "sealed-types",
      "collection-transforms",
      "lambdas-and-receivers",
      "extension-functions",
      "generics",
      "recomposition",
      "snapshot-state",
      "ui-identity",
      "state-restoration",
      "stability-and-skipping",
      "modifier-order",
      "composition-local",
      "android-build-variants",
      "android-app-entry",
      "android-resources",
      "android-intents",
      "android-activity-lifecycle",
      "component",
      "props",
      "children",
      "conditional-ui",
      "layout",
      "layout-constraints",
      "window-insets",
      "adaptive-layouts",
      "vertical-layout",
      "horizontal-layout",
      "stack",
      "list",
      "grid",
      "text-input",
      "local-state",
      "derived-state",
      "global-state",
      "button",
      "accessibility-semantics",
      "gesture-abstractions",
      "form",
      "side-effects",
      "state-driven-animation",
      "lifecycle",
      "navigation",
      "back-navigation",
      "route-parameters",
      "deep-link",
      "async",
      "coroutine-scopes",
      "flow-and-stateflow",
      "flow-composition",
      "loading-state",
      "error-handling",
      "api-request",
      "pagination",
      "local-storage",
      "secure-storage",
      "repository-boundary",
      "dependency-injection",
      "offline-first-data",
      "offline-pagination",
      "durable-background-work",
      "android-notifications",
      "state-owner-testing",
      "navigation-testing",
      "background-work-testing",
      "authentication",
      "runtime-permissions",
      "theme",
      "ui-behavior-testing",
    ]);
    expect(getRoadmapLessonLocation(roadmap!, "local-state")?.section.id).toBe(
      "state",
    );
    expect(getRoadmapLessonLocation(roadmap!, "generics")?.section.id).toBe(
      "kotlin-bridge",
    );
    expect(
      getRoadmapLessonLocation(roadmap!, "state-restoration")?.section.id,
    ).toBe("compose-runtime");
  });

  test("rejects unknown concept references", () => {
    const invalidRoadmap = {
      source: "react-native",
      target: "kotlin",
      sections: [
        {
          id: "fundamentals",
          title: "Fundamentals",
          order: 10,
          lessons: [
            {
              conceptSlug: "missing-concept",
              title: "Missing",
              order: 10,
              exercise: "Practice the missing concept.",
              checklist: ["Can identify the missing concept."],
              stages: [
                {
                  id: "basic",
                  title: "Basic",
                  description: "Understand the smallest example.",
                },
                {
                  id: "applied",
                  title: "Applied",
                  description: "Use it in an interaction.",
                },
                {
                  id: "production",
                  title: "Production",
                  description: "Apply it in a maintained feature.",
                },
              ],
            },
          ],
        },
      ],
    };

    expect(() =>
      validateRoadmaps([invalidRoadmap], new Set(["component"])),
    ).toThrow(/unknown concept: missing-concept/);
  });
});

describe("recipe content", () => {
  test("localizes recipe prose while preserving code", () => {
    expect(Object.keys(viRecipeTranslations)).toHaveLength(getRecipes().length);
    for (const english of getRecipes("en")) {
      const vietnamese = getRecipeBySlug(english.slug, "vi");
      expect(vietnamese?.architectureNotes).toHaveLength(
        english.architectureNotes.length,
      );
      for (const technology of ["react-native", "kotlin"] as const) {
        expect(vietnamese?.implementations[technology]?.code).toBe(
          english.implementations[technology]?.code,
        );
      }
    }
    expect(getRecipeBySlug("api-request", "vi")?.title).toBe("Gọi API");
  });

  test("preserves cancellation, append retry, and safe deep-link parsing", () => {
    expect(
      getRecipeBySlug("api-request")?.implementations.kotlin?.code,
    ).toContain("catch (cancelled: CancellationException)");
    const pagination = getRecipeBySlug("pagination");
    expect(pagination?.implementations["react-native"]?.code).toContain(
      "finally {",
    );
    expect(pagination?.implementations.kotlin?.code).toContain("posts::retry");
    const deepLinks =
      getRecipeBySlug("deep-links")?.implementations.kotlin?.code;
    expect(deepLinks).not.toContain("!!");
    expect(deepLinks).toContain("InvalidLinkScreen()");
    expect(
      getRecipeBySlug("biometric-login")?.implementations.kotlin?.code,
    ).toContain("object : BiometricPrompt.AuthenticationCallback()");
  });

  test("loads the MVP implementation recipes", () => {
    expect(getRecipes()).toHaveLength(6);
    expect(getRecipeBySlug("deep-links")?.implementations.kotlin).toBeDefined();
  });

  test("requires at least one framework implementation", () => {
    expect(() =>
      validateRecipe({
        slug: "api-request",
        title: "API Request",
        description: "Make an HTTP request.",
        category: "networking",
        keywords: ["HTTP"],
        flow: ["Request", "Response"],
        implementations: {},
        architectureNotes: ["Keep transport details behind a repository."],
      }),
    ).toThrow(/expected at least one implementation/);
  });
});
