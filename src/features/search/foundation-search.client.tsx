"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { formatMessage, getMessages } from "@/lib/i18n/messages";
import {
  searchFoundationIndex,
  type FoundationSearchEntry,
} from "@/lib/search/foundation-index";
import { FOUNDATION_TOPICS } from "@/types/foundation";
import type { Locale } from "@/types/locale";

export function FoundationSearch({
  index,
  locale,
}: {
  index: readonly FoundationSearchEntry[];
  locale: Locale;
}) {
  const messages = getMessages(locale).foundations;
  const inputId = useId();
  const [query, setQuery] = useState("");
  const results = searchFoundationIndex(index, query);

  return (
    <div className="mt-10">
      <label htmlFor={inputId} className="block text-sm font-medium">
        {messages.search}
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={messages.placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-subtle bg-surface px-4 text-base shadow-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <p role="status" className="mt-3 text-sm text-muted">
        {results.length === 0
          ? messages.noResults
          : formatMessage(messages.results, { count: results.length })}
      </p>
      {FOUNDATION_TOPICS.map((topic) => {
        const entries = results.filter((entry) => entry.topic === topic);
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
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    className="block h-full rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
                    href={`/${locale}/foundations/${entry.slug}`}
                  >
                    <h3 className="font-semibold">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {entry.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
