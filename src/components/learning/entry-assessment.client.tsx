"use client";

import { useState } from "react";
import { getRecommendedLearningLevel } from "@/lib/learning-entry";
import type {
  EntryQuestionId,
  LearningEntryGuide,
  LearningLevel,
} from "@/types/learning-entry";

type AssessmentCopy = Pick<
  LearningEntryGuide,
  | "title"
  | "introduction"
  | "answerYes"
  | "answerNo"
  | "incomplete"
  | "recommendation"
  | "viewPath"
  | "questions"
>;

type EntryAssessmentProps = {
  copy: AssessmentCopy;
  pathNames: readonly { level: LearningLevel; title: string }[];
};

export function EntryAssessment({ copy, pathNames }: EntryAssessmentProps) {
  const [answers, setAnswers] = useState<
    Partial<Record<EntryQuestionId, boolean>>
  >({});
  const level = getRecommendedLearningLevel(answers);
  const path = pathNames.find((candidate) => candidate.level === level);

  return (
    <section
      aria-labelledby="entry-assessment-title"
      className="rounded-xl border border-subtle bg-surface p-5 sm:p-6"
    >
      <h2 id="entry-assessment-title" className="text-2xl font-semibold">
        {copy.title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
        {copy.introduction}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.questions.map((question) => (
          <fieldset
            key={question.id}
            className="rounded-lg border border-subtle p-4"
          >
            <legend className="px-1 font-medium">{question.title}</legend>
            <p className="text-sm leading-6 text-muted">{question.proof}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {(
                [
                  { value: true, label: copy.answerYes },
                  { value: false, label: copy.answerNo },
                ] as const
              ).map((choice) => (
                <label
                  key={String(choice.value)}
                  className="flex items-center gap-2"
                >
                  <input
                    checked={answers[question.id] === choice.value}
                    className="accent-accent"
                    name={`entry-${question.id}`}
                    onChange={() =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: choice.value,
                      }))
                    }
                    type="radio"
                    value={String(choice.value)}
                  />
                  {choice.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 text-sm">
        {path ? (
          <p>
            {copy.recommendation}: <strong>{path.title}</strong>.{" "}
            <a
              className="font-medium text-accent hover:underline"
              href={`#path-${level}`}
            >
              {copy.viewPath}
            </a>
          </p>
        ) : (
          <p className="text-muted">{copy.incomplete}</p>
        )}
      </div>
    </section>
  );
}
