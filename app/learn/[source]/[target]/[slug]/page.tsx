import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeComparison } from "@/components/compare/code-comparison";
import { MentalModel } from "@/components/compare/mental-model";
import { CompleteLessonButton } from "@/components/learning/complete-lesson-button.client";
import { LearningSidebar } from "@/components/learning/learning-sidebar.client";
import { LessonStages } from "@/components/learning/lesson-stages";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { getCompareUrl } from "@/lib/compare";
import { getConceptBySlug } from "@/lib/content/concepts";
import {
  getRoadmap,
  getRoadmapLessonLocation,
  getRoadmapLessonLocations,
  getRoadmaps,
} from "@/lib/content/roadmaps";
import { getTechnologyById, isTechnology } from "@/lib/content/technologies";
import { createPageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getRoadmaps().flatMap((roadmap) =>
    getRoadmapLessonLocations(roadmap).map(({ lesson }) => ({
      source: roadmap.source,
      target: roadmap.target,
      slug: lesson.conceptSlug,
    })),
  );
}

type LessonPageProps = {
  params: Promise<{ slug: string; source: string; target: string }>;
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug, source, target } = await params;
  const concept = getConceptBySlug(slug);

  if (
    !concept ||
    !isTechnology(source) ||
    !isTechnology(target) ||
    source === target
  ) {
    return {};
  }

  return createPageMetadata({
    title: `${concept.title}: ${source} to ${target}`,
    description: concept.description,
    path: `/learn/${source}/${target}/${concept.slug}`,
  });
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, source, target } = await params;

  if (!isTechnology(source) || !isTechnology(target) || source === target) {
    notFound();
  }

  const roadmap = getRoadmap(source, target);
  const concept = getConceptBySlug(slug);
  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);

  if (!roadmap || !concept || !sourceTechnology || !targetTechnology) {
    notFound();
  }

  const lessonLocation = getRoadmapLessonLocation(roadmap, slug);

  if (!lessonLocation) {
    notFound();
  }

  const lessons = getRoadmapLessonLocations(roadmap);
  const lessonIndex = lessons.findIndex(
    ({ lesson }) => lesson.conceptSlug === slug,
  );
  const previousLesson = lessons[lessonIndex - 1]?.lesson;
  const nextLesson = lessons[lessonIndex + 1]?.lesson;
  const pair = { source, target };
  const sourceImplementation = concept.implementations[source];
  const targetImplementation = concept.implementations[target];
  const codeComparison =
    sourceImplementation?.code && targetImplementation?.code
      ? {
          source: { ...sourceImplementation, code: sourceImplementation.code },
          target: { ...targetImplementation, code: targetImplementation.code },
        }
      : undefined;

  return (
    <Container className="flex-1 py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="min-w-0">
          <nav
            className="text-sm font-medium text-muted"
            aria-label="Breadcrumb"
          >
            <Link
              className="hover:text-foreground"
              href={`/learn/${source}/${target}`}
            >
              Roadmap
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{lessonLocation.section.title}</span>
          </nav>
          <header className="mt-8 max-w-3xl">
            <Badge variant="accent">{lessonLocation.section.title}</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {concept.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {concept.description}
            </p>
          </header>

          <section className="mt-10" aria-labelledby="implementation-title">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="implementation-title" className="text-2xl font-semibold">
                Implementation comparison
              </h2>
              <Link
                className="text-sm font-medium text-accent hover:underline"
                href={getCompareUrl(slug, pair)}
              >
                Open full comparison
              </Link>
            </div>
            <div className="mt-5">
              {codeComparison ? (
                <CodeComparison
                  source={{
                    implementation: codeComparison.source,
                    technology: sourceTechnology,
                  }}
                  target={{
                    implementation: codeComparison.target,
                    technology: targetTechnology,
                  }}
                />
              ) : (
                <Callout title="Code comparison unavailable" tone="warning">
                  This lesson is part of the roadmap, but code examples are not
                  available for both selected technologies yet.
                </Callout>
              )}
            </div>
          </section>

          <section
            className="mt-10 max-w-4xl"
            aria-labelledby="learning-stages-title"
          >
            <div>
              <p className="text-sm font-semibold text-accent">Lesson plan</p>
              <h2
                id="learning-stages-title"
                className="mt-2 text-2xl font-semibold"
              >
                Learn from basic to production
              </h2>
            </div>
            <LessonStages
              sourceTechnology={sourceTechnology}
              stageLabel="Stage {count}"
              stages={lessonLocation.lesson.stages}
              targetTechnology={targetTechnology}
            />
          </section>

          <section className="mt-10 max-w-4xl space-y-6">
            <Callout title="Practice task" tone="info">
              {lessonLocation.lesson.exercise}
            </Callout>
            <div className="rounded-xl border border-subtle bg-surface p-6">
              <h2 className="text-2xl font-semibold">Completion checklist</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {lessonLocation.lesson.checklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-10 max-w-4xl space-y-8">
            <MentalModel>{concept.mentalModel}</MentalModel>
            <div>
              <h2 className="text-2xl font-semibold">What changes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {concept.differences.map((difference) => (
                  <li key={difference} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent">
                      •
                    </span>
                    {difference}
                  </li>
                ))}
              </ul>
            </div>
            <Callout title="Production note" tone="success">
              <ul className="list-disc space-y-2 pl-5">
                {concept.productionNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Callout>
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-subtle pt-6">
            <CompleteLessonButton pair={pair} slug={slug} />
            <nav
              className="flex gap-4 text-sm font-medium"
              aria-label="Lesson navigation"
            >
              {previousLesson && (
                <Link
                  className="text-muted hover:text-foreground"
                  href={`/learn/${source}/${target}/${previousLesson.conceptSlug}`}
                >
                  Previous
                </Link>
              )}
              {nextLesson && (
                <Link
                  className="text-accent hover:underline"
                  href={`/learn/${source}/${target}/${nextLesson.conceptSlug}`}
                >
                  Next lesson
                </Link>
              )}
            </nav>
          </div>
        </article>
        <LearningSidebar currentSlug={slug} pair={pair} roadmap={roadmap} />
      </div>
    </Container>
  );
}
