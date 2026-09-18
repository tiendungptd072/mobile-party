import { apiRequestConcept } from "@content/concepts/api-request";
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
import { errorHandlingConcept } from "@content/concepts/error-handling";
import { loadingStateConcept } from "@content/concepts/loading-state";
import { localStorageConcept } from "@content/concepts/local-storage";
import { textInputConcept } from "@content/concepts/text-input";

export const rawConcepts = [
  componentConcept,
  propsConcept,
  childrenConcept,
  conditionalUiConcept,
  localStateConcept,
  derivedStateConcept,
  globalStateConcept,
  layoutConcept,
  textInputConcept,
  formConcept,
  listConcept,
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
] as const;
