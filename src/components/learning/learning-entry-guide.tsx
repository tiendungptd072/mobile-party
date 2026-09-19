import Link from "next/link";
import { EntryAssessment } from "@/components/learning/entry-assessment.client";
import { Callout } from "@/components/ui/callout";
import { getRoadmapLessonLocation } from "@/lib/content/roadmaps";
import type { Locale } from "@/lib/i18n/locale";
import type { LearningEntryGuide } from "@/types/learning-entry";
import type { Roadmap } from "@/types/roadmap";

type LearningEntryGuideProps = {
  guide: LearningEntryGuide;
  locale: Locale;
  roadmap: Roadmap;
};

export function LearningEntryGuide({
  guide,
  locale,
  roadmap,
}: LearningEntryGuideProps) {
  const {
    title,
    introduction,
    answerYes,
    answerNo,
    incomplete,
    recommendation,
    viewPath,
    questions,
  } = guide;

  return (
    <div className="mt-10 space-y-8">
      <EntryAssessment
        copy={{
          title,
          introduction,
          answerYes,
          answerNo,
          incomplete,
          recommendation,
          viewPath,
          questions,
        }}
        pathNames={guide.paths.map(({ level, title }) => ({ level, title }))}
      />
      <section aria-labelledby="learning-paths-title">
        <h2 id="learning-paths-title" className="text-2xl font-semibold">
          {guide.pathsTitle}
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {guide.paths.map((path) => (
            <article
              key={path.level}
              id={`path-${path.level}`}
              className="scroll-mt-24 rounded-xl border border-subtle bg-surface p-5"
            >
              <h3 className="text-lg font-semibold">{path.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {path.audience}
              </p>
              <h4 className="mt-5 text-sm font-semibold">
                {guide.prerequisiteLabel}
              </h4>
              <p className="mt-1 text-sm leading-6 text-muted">
                {path.prerequisite}
              </p>
              <h4 className="mt-5 text-sm font-semibold">
                {guide.lessonsLabel}
              </h4>
              <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
                {path.lessonSlugs.map((slug) => {
                  const lesson = getRoadmapLessonLocation(
                    roadmap,
                    slug,
                  )?.lesson;
                  if (!lesson) return null;
                  return (
                    <li key={slug}>
                      <Link
                        className="text-accent hover:underline"
                        href={`/${locale}/learn/${roadmap.source}/${roadmap.target}/${slug}`}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <h4 className="mt-5 text-sm font-semibold">
                {guide.milestoneLabel}
              </h4>
              <p className="mt-1 text-sm leading-6 text-muted">
                {path.milestone}
              </p>
              <h4 className="mt-5 text-sm font-semibold">
                {guide.rubricLabel}
              </h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-6 text-muted">
                {path.rubric.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <Callout title={guide.availabilityTitle}>
        {guide.futureContentNote}
      </Callout>
      <section aria-labelledby="module-prerequisites-title">
        <h2 id="module-prerequisites-title" className="text-2xl font-semibold">
          {guide.modulesTitle}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          {guide.skipGuidance}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {guide.modules.map((module) => {
            const section = roadmap.sections.find(
              (candidate) => candidate.id === module.sectionId,
            );
            const lesson = getRoadmapLessonLocation(
              roadmap,
              module.lessonSlug,
            )?.lesson;
            if (!section || !lesson) return null;
            return (
              <details
                key={module.sectionId}
                className="rounded-xl border border-subtle bg-surface p-4"
              >
                <summary className="cursor-pointer font-medium">
                  {section.title}
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-6">
                  <div>
                    <h3 className="font-semibold">{guide.prerequisiteLabel}</h3>
                    <p className="text-muted">{module.prerequisite}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">{guide.moduleCheckLabel}</h3>
                    <p className="text-muted">{module.check}</p>
                  </div>
                  <Link
                    className="inline-block font-medium text-accent hover:underline"
                    href={`/${locale}/learn/${roadmap.source}/${roadmap.target}/${module.lessonSlug}`}
                  >
                    {lesson.title}
                  </Link>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
