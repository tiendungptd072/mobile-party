import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/i18n/messages";
import { FOUNDATION_TOPICS, type FoundationArticle } from "@/types/foundation";
import type { Locale } from "@/types/locale";

export function FoundationIndex({
  articles,
  locale,
}: {
  articles: readonly FoundationArticle[];
  locale: Locale;
}) {
  const messages = getMessages(locale).foundations;
  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.description}
        </p>
      </header>
      {articles.length === 0 && (
        <p className="mt-10 text-muted">{messages.empty}</p>
      )}
      {FOUNDATION_TOPICS.map((topic) => {
        const entries = articles
          .filter((article) => article.metadata.topic === topic)
          .toSorted(
            (a, b) =>
              a.metadata.order - b.metadata.order ||
              a.metadata.slug.localeCompare(b.metadata.slug),
          );
        if (entries.length === 0) return null;
        return (
          <section
            key={topic}
            className="mt-10"
            aria-labelledby={`topic-${topic}`}
          >
            <h2 id={`topic-${topic}`} className="text-2xl font-semibold">
              {messages.topics[topic]}
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((article) => (
                <li key={article.metadata.slug}>
                  <Link
                    className="block h-full rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
                    href={`/${locale}/foundations/${article.metadata.slug}`}
                  >
                    <h3 className="font-semibold">{article.localized.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {article.localized.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Container>
  );
}
