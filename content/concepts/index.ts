import { apiRequestConcept } from "@content/concepts/api-request";
import { authenticationConcept } from "@content/concepts/authentication";
import { buttonConcept } from "@content/concepts/button";
import { asyncConcept } from "@content/concepts/async";
import { componentConcept } from "@content/concepts/component";
import { propsConcept } from "@content/concepts/props";
import { childrenConcept } from "@content/concepts/children";
import { conditionalUiConcept } from "@content/concepts/conditional-ui";
import { layoutConcept } from "@content/concepts/layout";
import { listConcept } from "@content/concepts/list";
import { localStateConcept } from "@content/concepts/local-state";
import { derivedStateConcept } from "@content/concepts/derived-state";
import { globalStateConcept } from "@content/concepts/global-state";
import { sideEffectsConcept } from "@content/concepts/side-effects";
import { lifecycleConcept } from "@content/concepts/lifecycle";
import { formConcept } from "@content/concepts/form";
import { navigationConcept } from "@content/concepts/navigation";
import { routeParametersConcept } from "@content/concepts/route-parameters";
import { deepLinkConcept } from "@content/concepts/deep-link";
import { gridConcept } from "@content/concepts/grid";
import { horizontalLayoutConcept } from "@content/concepts/horizontal-layout";
import { errorHandlingConcept } from "@content/concepts/error-handling";
import { loadingStateConcept } from "@content/concepts/loading-state";
import { localStorageConcept } from "@content/concepts/local-storage";
import { paginationConcept } from "@content/concepts/pagination";
import { secureStorageConcept } from "@content/concepts/secure-storage";
import { stackConcept } from "@content/concepts/stack";
import { textInputConcept } from "@content/concepts/text-input";
import { verticalLayoutConcept } from "@content/concepts/vertical-layout";
import { themeConcept } from "@content/concepts/theme";
import { collectionTransformsConcept } from "@content/concepts/collection-transforms";
import { dataClassesConcept } from "@content/concepts/data-classes";
import { extensionFunctionsConcept } from "@content/concepts/extension-functions";
import { genericsConcept } from "@content/concepts/generics";
import { lambdasAndReceiversConcept } from "@content/concepts/lambdas-and-receivers";
import { nullSafetyConcept } from "@content/concepts/null-safety";
import { sealedTypesConcept } from "@content/concepts/sealed-types";
import { recompositionConcept } from "@content/concepts/recomposition";
import { uiIdentityConcept } from "@content/concepts/ui-identity";
import { stateRestorationConcept } from "@content/concepts/state-restoration";
import { stabilityAndSkippingConcept } from "@content/concepts/stability-and-skipping";
import { snapshotStateConcept } from "@content/concepts/snapshot-state";
import { modifierOrderConcept } from "@content/concepts/modifier-order";
import { compositionLocalConcept } from "@content/concepts/composition-local";
import { layoutConstraintsConcept } from "@content/concepts/layout-constraints";
import { windowInsetsConcept } from "@content/concepts/window-insets";
import { adaptiveLayoutsConcept } from "@content/concepts/adaptive-layouts";
import { accessibilitySemanticsConcept } from "@content/concepts/accessibility-semantics";
import { stateDrivenAnimationConcept } from "@content/concepts/state-driven-animation";
import { gestureAbstractionsConcept } from "@content/concepts/gesture-abstractions";
import { runtimePermissionsConcept } from "@content/concepts/runtime-permissions";
import { backNavigationConcept } from "@content/concepts/back-navigation";
import { uiBehaviorTestingConcept } from "@content/concepts/ui-behavior-testing";
import { getConceptReferences } from "@content/concepts/references";

const conceptDefinitions = [
  nullSafetyConcept,
  dataClassesConcept,
  sealedTypesConcept,
  collectionTransformsConcept,
  lambdasAndReceiversConcept,
  extensionFunctionsConcept,
  genericsConcept,
  recompositionConcept,
  snapshotStateConcept,
  uiIdentityConcept,
  stateRestorationConcept,
  stabilityAndSkippingConcept,
  modifierOrderConcept,
  compositionLocalConcept,
  componentConcept,
  propsConcept,
  childrenConcept,
  conditionalUiConcept,
  localStateConcept,
  derivedStateConcept,
  globalStateConcept,
  layoutConcept,
  layoutConstraintsConcept,
  windowInsetsConcept,
  adaptiveLayoutsConcept,
  verticalLayoutConcept,
  horizontalLayoutConcept,
  stackConcept,
  textInputConcept,
  buttonConcept,
  accessibilitySemanticsConcept,
  stateDrivenAnimationConcept,
  gestureAbstractionsConcept,
  formConcept,
  listConcept,
  paginationConcept,
  gridConcept,
  sideEffectsConcept,
  lifecycleConcept,
  asyncConcept,
  loadingStateConcept,
  errorHandlingConcept,
  navigationConcept,
  backNavigationConcept,
  routeParametersConcept,
  deepLinkConcept,
  apiRequestConcept,
  runtimePermissionsConcept,
  localStorageConcept,
  secureStorageConcept,
  authenticationConcept,
  themeConcept,
  uiBehaviorTestingConcept,
] as const;

export const rawConcepts = conceptDefinitions.map((concept) => ({
  ...concept,
  references: getConceptReferences(concept.slug),
}));
