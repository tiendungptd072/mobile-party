"use client";

import Link from "next/link";
import { useLearningProgress } from "@/features/learning-progress/use-learning-progress.client";
import { getLearnUrl, type TechnologyPair } from "@/lib/technology-pair";
import type { Roadmap } from "@/types/roadmap";
import { cn } from "@/lib/utils/cn";

type LearningSidebarProps = {
  currentSlug?: string;
  pair: TechnologyPair;
  roadmap: Roadmap;
};

export function LearningSidebar({
  currentSlug,
  pair,
  roadmap,
}: LearningSidebarProps) {
  const { completedLessons } = useLearningProgress(pair);
  const lessonCount = roadmap.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  return (
    <aside className="rounded-xl border border-subtle bg-surface p-4 lg:sticky lg:top-24">
      <p className="text-sm font-semibold">Roadmap progress</p>
      <p className="mt-1 text-sm text-muted">
        {completedLessons.length} of {lessonCount} lessons complete
      </p>
      <nav className="mt-5 space-y-5" aria-label="Learning roadmap">
        {roadmap.sections.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            <h2
              id={`section-${section.id}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted"
            >
              {section.title}
            </h2>
            <ol className="mt-2 space-y-1">
              {section.lessons.map((lesson) => {
                const isCompleted = completedLessons.includes(
                  lesson.conceptSlug,
                );
                const isCurrent = currentSlug === lesson.conceptSlug;

                return (
                  <li key={lesson.conceptSlug}>
                    <Link
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "flex rounded-md px-2 py-1.5 text-sm text-muted hover:bg-surface-raised hover:text-foreground aria-[current=page]:bg-surface-raised aria-[current=page]:font-medium aria-[current=page]:text-foreground",
                        isCompleted && "text-success",
                      )}
                      href={getLearnUrl(pair, lesson.conceptSlug)}
                    >
                      <span aria-hidden="true" className="mr-2 w-4">
                        {isCompleted ? "✓" : "○"}
                      </span>
                      {lesson.title}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </nav>
    </aside>
  );
}
