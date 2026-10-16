import { Container } from "@/components/ui/container";
import { getMessages } from "@/lib/i18n/messages";
import type { FoundationArticle } from "@/types/foundation";
import { FoundationSearch } from "@/features/search/foundation-search.client";
import { createFoundationSearchIndex } from "@/lib/search/foundation-index";
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
      {articles.length > 0 && (
        <FoundationSearch
          index={createFoundationSearchIndex(articles)}
          locale={locale}
        />
      )}
    </Container>
  );
}
