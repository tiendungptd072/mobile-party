import Link from "next/link";
import {
  FoundationBody,
  FoundationReferences,
} from "@/components/foundations/foundation-body";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/i18n/messages";
import type { FoundationArticle } from "@/types/foundation";
import type { Concept } from "@/types/concept";

type FoundationReaderProps = {
  article: FoundationArticle;
  relatedArticles: readonly FoundationArticle[];
  relatedConcepts: readonly Pick<Concept, "slug" | "title">[];
};

export function FoundationReader({
  article,
  relatedArticles,
  relatedConcepts,
}: FoundationReaderProps) {
  const { locale, localized, metadata, body } = article;
  const messages = getMessages(locale).foundations;
  const headings = body.foundation.headings.filter(
    (heading) => heading.level <= 3,
  );
  return (
    <Container className="flex-1 py-12 sm:py-16">
      <nav aria-label={messages.breadcrumbs} className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${locale}`} className="hover:text-foreground">
              {messages.home}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/${locale}/foundations`}
              className="hover:text-foreground"
            >
              {messages.title}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {localized.title}
          </li>
        </ol>
      </nav>
      <header className="mt-8 max-w-3xl">
        <Badge variant="accent">{messages.topics[metadata.topic]}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {localized.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {localized.description}
        </p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-4">
        {headings.length > 0 && (
          <nav
            aria-label={messages.contents}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="font-semibold">{messages.contents}</h2>
            <ul className="mt-3 space-y-2 border-l border-subtle text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={heading.level === 3 ? "pl-6" : "pl-3"}
                >
                  <a
                    className="text-muted hover:text-accent"
                    href={`#${heading.id}`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <article className="min-w-0 lg:col-span-3">
          <div className="prose max-w-none text-foreground prose-headings:scroll-mt-24 prose-headings:text-foreground prose-p:leading-8 prose-a:break-words prose-a:text-accent prose-code:text-foreground prose-pre:bg-surface prose-th:text-foreground prose-strong:text-foreground prose-hr:border-subtle prose-li:marker:text-muted">
            <FoundationBody article={article} />
          </div>
          <div className="[&_a]:break-words [&_li]:scroll-mt-24">
            <FoundationReferences article={article} />
          </div>
          {relatedArticles.length > 0 && (
            <section className="mt-10" aria-labelledby="related-articles-title">
              <h2
                id="related-articles-title"
                className="text-2xl font-semibold"
              >
                {messages.relatedArticles}
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedArticles.map((entry) => (
                  <li key={entry.metadata.slug}>
                    <Link
                      className="text-accent hover:underline"
                      href={`/${locale}/foundations/${entry.metadata.slug}`}
                    >
                      {entry.localized.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {relatedConcepts.length > 0 && (
            <section className="mt-10" aria-labelledby="related-concepts-title">
              <h2
                id="related-concepts-title"
                className="text-2xl font-semibold"
              >
                {messages.relatedConcepts}
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedConcepts.map((concept) => (
                  <li key={concept.slug}>
                    <Link
                      className="text-accent hover:underline"
                      href={`/${locale}/compare/${concept.slug}`}
                    >
                      {concept.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </Container>
  );
}
