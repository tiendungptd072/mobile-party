import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeComparison } from "@/components/compare/code-comparison";
import { MentalModel } from "@/components/compare/mental-model";
import { CompleteLessonButton } from "@/components/learning/complete-lesson-button.client";
import { LearningSidebar } from "@/components/learning/learning-sidebar.client";
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
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { formatMessage, getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleLessonPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
    source: string;
    target: string;
  }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getRoadmaps().flatMap((roadmap) =>
      getRoadmapLessonLocations(roadmap).map(({ lesson }) => ({
        locale,
        source: roadmap.source,
        target: roadmap.target,
        slug: lesson.conceptSlug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: LocaleLessonPageProps): Promise<Metadata> {
  const { locale, slug, source, target } = await params;
  if (
    !isLocale(locale) ||
    !isTechnology(source) ||
    !isTechnology(target) ||
    source === target
  )
    return {};
  const concept = getConceptBySlug(slug, locale);
  return concept
    ? createLocalizedPageMetadata({
        locale,
        path: `/learn/${source}/${target}/${concept.slug}`,
        title: concept.title,
        description: concept.description,
      })
    : {};
}

export default async function LocaleLessonPage({
  params,
}: LocaleLessonPageProps) {
  const { locale, slug, source, target } = await params;
  if (
    !isLocale(locale) ||
    !isTechnology(source) ||
    !isTechnology(target) ||
    source === target
  )
    notFound();

  const roadmap = getRoadmap(source, target, locale);
  const concept = getConceptBySlug(slug, locale);
  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);
  if (!roadmap || !concept || !sourceTechnology || !targetTechnology)
    notFound();

  const lessonLocation = getRoadmapLessonLocation(roadmap, slug);
  if (!lessonLocation) notFound();

  const messages = getMessages(locale);
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
            aria-label={messages.learn.roadmap}
          >
            <Link
              className="hover:text-foreground"
              href={`/${locale}/learn/${source}/${target}`}
            >
              {messages.learn.roadmap}
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
                {messages.learn.implementation}
              </h2>
              <Link
                className="text-sm font-medium text-accent hover:underline"
                href={`/${locale}${getCompareUrl(slug, pair)}`}
              >
                {messages.learn.openComparison}
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
                <Callout title={messages.learn.codeUnavailable} tone="warning">
                  {messages.learn.codeUnavailableDescription}
                </Callout>
              )}
            </div>
          </section>
          <section
            className="mt-10 max-w-4xl"
            aria-labelledby="learning-stages-title"
          >
            <div>
              <p className="text-sm font-semibold text-accent">
                {messages.learn.plan}
              </p>
              <h2
                id="learning-stages-title"
                className="mt-2 text-2xl font-semibold"
              >
                {messages.learn.staged}
              </h2>
            </div>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
              {lessonLocation.lesson.stages.map((stage, index) => (
                <li
                  key={stage.id}
                  className="rounded-xl border border-subtle bg-surface p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {formatMessage(messages.learn.stage, { count: index + 1 })}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
          <section className="mt-10 max-w-4xl space-y-6">
            <Callout title={messages.learn.practice} tone="info">
              {lessonLocation.lesson.exercise}
            </Callout>
            <div className="rounded-xl border border-subtle bg-surface p-6">
              <h2 className="text-2xl font-semibold">
                {messages.learn.checklist}
              </h2>
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
              <h2 className="text-2xl font-semibold">
                {messages.learn.changes}
              </h2>
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
            <Callout title={messages.learn.production} tone="success">
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
              aria-label={messages.learn.roadmap}
            >
              {previousLesson && (
                <Link
                  className="text-muted hover:text-foreground"
                  href={`/${locale}/learn/${source}/${target}/${previousLesson.conceptSlug}`}
                >
                  {messages.learn.previous}
                </Link>
              )}
              {nextLesson && (
                <Link
                  className="text-accent hover:underline"
                  href={`/${locale}/learn/${source}/${target}/${nextLesson.conceptSlug}`}
                >
                  {messages.learn.next}
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
