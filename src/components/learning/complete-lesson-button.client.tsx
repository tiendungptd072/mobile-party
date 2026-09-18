"use client";

import { Button } from "@/components/ui/button";
import { useLearningProgress } from "@/features/learning-progress/use-learning-progress.client";
import type { TechnologyPair } from "@/lib/technology-pair";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

type CompleteLessonButtonProps = {
  pair: TechnologyPair;
  slug: string;
};

export function CompleteLessonButton({
  pair,
  slug,
}: CompleteLessonButtonProps) {
  const messages = useLocaleMessages();
  const { completedLessons, setLessonCompleted } = useLearningProgress(pair);
  const isCompleted = completedLessons.includes(slug);

  return (
    <Button
      aria-pressed={isCompleted}
      variant={isCompleted ? "secondary" : "primary"}
      onClick={() => setLessonCompleted(slug, !isCompleted)}
    >
      {isCompleted ? messages.learn.incomplete : messages.learn.complete}
    </Button>
  );
}
