import { apiRequestConcept } from "@content/concepts/api-request";
import { asyncConcept } from "@content/concepts/async";
import { componentConcept } from "@content/concepts/component";
import { conditionalUiConcept } from "@content/concepts/conditional-ui";
import { layoutConcept } from "@content/concepts/layout";
import { listConcept } from "@content/concepts/list";
import { localStateConcept } from "@content/concepts/local-state";
import { textInputConcept } from "@content/concepts/text-input";

export const rawConcepts = [
  componentConcept,
  conditionalUiConcept,
  localStateConcept,
  layoutConcept,
  textInputConcept,
  listConcept,
  asyncConcept,
  apiRequestConcept,
] as const;
