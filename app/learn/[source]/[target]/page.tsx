import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { LearningSidebar } from "@/components/learning/learning-sidebar.client";
import { getRoadmap, getRoadmaps } from "@/lib/content/roadmaps";
import { getTechnologyById, isTechnology } from "@/lib/content/technologies";
import { createPageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getRoadmaps().map((roadmap) => ({
    source: roadmap.source,
    target: roadmap.target,
  }));
}

type LearnPageProps = {
  params: Promise<{ source: string; target: string }>;
};

export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const { source, target } = await params;

  if (!isTechnology(source) || !isTechnology(target) || source === target) {
    return {};
  }

  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);

  return sourceTechnology && targetTechnology
    ? createPageMetadata({
        title: `${sourceTechnology.shortName} to ${targetTechnology.shortName}`,
        description: `A learning roadmap from ${sourceTechnology.name} to ${targetTechnology.name}.`,
        path: `/learn/${source}/${target}`,
      })
    : {};
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { source, target } = await params;

  if (!isTechnology(source) || !isTechnology(target) || source === target) {
    notFound();
  }

  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);
  const roadmap = getRoadmap(source, target);

  if (!sourceTechnology || !targetTechnology) {
    notFound();
  }

  if (!roadmap) {
    return (
      <Container className="flex-1 py-12 sm:py-16">
        <Link
          className="text-sm font-medium text-muted hover:text-foreground"
          href="/"
        >
          Change learning path
        </Link>
        <header className="mt-8 max-w-3xl">
          <Badge variant="accent">Learning roadmap</Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {sourceTechnology.shortName} to {targetTechnology.shortName}
          </h1>
        </header>
        <Callout
          className="mt-10 max-w-3xl"
          title="Roadmap in development"
          tone="warning"
        >
          This technology pair is valid and saved, but its learning roadmap has
          not been published yet. Try React Native to Jetpack Compose for the
          current seed content.
        </Callout>
      </Container>
    );
  }

  const lessonCount = roadmap.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );
  const pair = { source, target };

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href="/"
      >
        Change learning path
      </Link>
      <header className="mt-8 max-w-3xl">
        <Badge variant="accent">Learning roadmap</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {sourceTechnology.shortName} to {targetTechnology.shortName}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Follow the concepts in order, compare their implementations, and mark
          each lesson when its mental model is clear.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-8">
          {roadmap.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={section.id} className="text-2xl font-semibold">
                  {section.title}
                </h2>
                <p className="text-sm text-muted">
                  {section.lessons.length} lesson
                  {section.lessons.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                {section.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.conceptSlug}
                    className="rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
                    href={`/learn/${source}/${target}/${lesson.conceptSlug}`}
                  >
                    <CardHeader className="p-0">
                      <CardDescription>
                        Lesson {index + 1} of {section.lessons.length}
                      </CardDescription>
                      <CardTitle>{lesson.title}</CardTitle>
                    </CardHeader>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <p className="text-sm text-muted">
            {lessonCount} lessons in this roadmap.
          </p>
        </div>
        <LearningSidebar pair={pair} roadmap={roadmap} />
      </div>
    </Container>
  );
}
