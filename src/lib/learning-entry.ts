import {
  ENTRY_QUESTION_IDS,
  type EntryQuestionId,
  type LearningLevel,
} from "@/types/learning-entry";

/** A self-check suggests where to start; it does not certify Android skill. */
export function getRecommendedLearningLevel(
  answers: Partial<Record<EntryQuestionId, boolean>>,
): LearningLevel | null {
  if (ENTRY_QUESTION_IDS.some((id) => answers[id] === undefined)) return null;
  if (!answers.kotlin || !answers.compose) return "junior";
  if (!answers.async || !answers.architecture) return "middle";
  return "senior";
}
