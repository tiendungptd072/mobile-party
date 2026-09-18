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

export const rawConcepts = [
  componentConcept,
  propsConcept,
  childrenConcept,
  conditionalUiConcept,
  localStateConcept,
  derivedStateConcept,
  globalStateConcept,
  layoutConcept,
  verticalLayoutConcept,
  horizontalLayoutConcept,
  stackConcept,
  textInputConcept,
  buttonConcept,
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
  routeParametersConcept,
  deepLinkConcept,
  apiRequestConcept,
  localStorageConcept,
  secureStorageConcept,
  authenticationConcept,
  themeConcept,
] as const;
