import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningSidebar } from "@/components/learning/learning-sidebar.client";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getRoadmap, getRoadmaps } from "@/lib/content/roadmaps";
import { getTechnologyById, isTechnology } from "@/lib/content/technologies";
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { formatMessage, getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleLearnPageProps = {
  params: Promise<{ locale: string; source: string; target: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getRoadmaps().map((roadmap) => ({
      locale,
      source: roadmap.source,
      target: roadmap.target,
    })),
  );
}

export async function generateMetadata({
  params,
}: LocaleLearnPageProps): Promise<Metadata> {
  const { locale, source, target } = await params;
  if (
    !isLocale(locale) ||
    !isTechnology(source) ||
    !isTechnology(target) ||
    source === target
  )
    return {};
  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);
  if (!sourceTechnology || !targetTechnology) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: `/learn/${source}/${target}`,
    title: `${sourceTechnology.shortName} → ${targetTechnology.shortName}`,
    description: messages.learn.intro,
  });
}

export default async function LocaleLearnPage({
  params,
}: LocaleLearnPageProps) {
  const { locale, source, target } = await params;
  if (
    !isLocale(locale) ||
    !isTechnology(source) ||
    !isTechnology(target) ||
    source === target
  )
    notFound();

  const sourceTechnology = getTechnologyById(source);
  const targetTechnology = getTechnologyById(target);
  if (!sourceTechnology || !targetTechnology) notFound();

  const messages = getMessages(locale);
  const roadmap = getRoadmap(source, target, locale);

  if (!roadmap) {
    return (
      <Container className="flex-1 py-12 sm:py-16">
        <Link
          className="text-sm font-medium text-muted hover:text-foreground"
          href={`/${locale}`}
        >
          {messages.learn.changePath}
        </Link>
        <header className="mt-8 max-w-3xl">
          <Badge variant="accent">{messages.learn.roadmap}</Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {sourceTechnology.shortName} → {targetTechnology.shortName}
          </h1>
        </header>
        <Callout
          className="mt-10 max-w-3xl"
          title={messages.learn.unavailableTitle}
          tone="warning"
        >
          {messages.learn.unavailable}
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
        href={`/${locale}`}
      >
        {messages.learn.changePath}
      </Link>
      <header className="mt-8 max-w-3xl">
        <Badge variant="accent">{messages.learn.roadmap}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {sourceTechnology.shortName} → {targetTechnology.shortName}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.learn.intro}
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
                  {section.lessons.length}{" "}
                  {section.lessons.length === 1
                    ? messages.learn.lesson
                    : messages.learn.lessons}
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                {section.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.conceptSlug}
                    className="rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
                    href={`/${locale}/learn/${source}/${target}/${lesson.conceptSlug}`}
                  >
                    <CardHeader className="p-0">
                      <CardDescription>
                        {formatMessage(messages.learn.lessonOf, {
                          current: index + 1,
                          total: section.lessons.length,
                        })}
                      </CardDescription>
                      <CardTitle>{lesson.title}</CardTitle>
                    </CardHeader>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <p className="text-sm text-muted">
            {formatMessage(messages.learn.total, { count: lessonCount })}
          </p>
        </div>
        <LearningSidebar pair={pair} roadmap={roadmap} />
      </div>
    </Container>
  );
}
