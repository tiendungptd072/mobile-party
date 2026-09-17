"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  searchConceptIndex,
  type ConceptSearchEntry,
} from "@/lib/search/concept-index";

type DictionarySearchProps = {
  index: readonly ConceptSearchEntry[];
};

export function DictionarySearch({ index }: DictionarySearchProps) {
  const router = useRouter();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = searchConceptIndex(index, query);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLocaleLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Home") {
      setActiveIndex(0);
    } else if (event.key === "End") {
      setActiveIndex(Math.max(results.length - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      router.push(`/dictionary/${results[activeIndex].slug}`);
    }
  }

  return (
    <section className="mt-10" aria-label="Dictionary search">
      <label className="block" htmlFor={inputId}>
        <span className="sr-only">Search the dictionary</span>
        <div className="relative">
          <input
            ref={inputRef}
            id={inputId}
            aria-activedescendant={
              results[activeIndex]
                ? `dictionary-result-${results[activeIndex].id}`
                : undefined
            }
            aria-controls={`${inputId}-results`}
            aria-expanded={results.length > 0}
            aria-autocomplete="list"
            className="h-12 w-full rounded-xl border border-subtle bg-surface px-4 pr-20 text-base shadow-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Search useState, remember, FlatList, async…"
            role="combobox"
            type="search"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-subtle bg-surface-raised px-2 py-1 text-xs text-muted">
            Ctrl / ⌘ K
          </kbd>
        </div>
      </label>

      <ul id={`${inputId}-results`} className="mt-5 grid gap-3" role="listbox">
        {results.map((entry, index) => (
          <li
            key={entry.id}
            id={`dictionary-result-${entry.id}`}
            aria-selected={index === activeIndex}
            role="option"
          >
            <Link
              className="block rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised aria-selected:border-accent"
              href={`/dictionary/${entry.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold">{entry.title}</h2>
                <span className="rounded-full border border-subtle bg-surface-raised px-2.5 py-1 text-xs font-medium capitalize text-muted">
                  {entry.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                {entry.description}
              </p>
              <p className="mt-3 text-sm text-muted">
                {[...entry.aliases, ...entry.keywords].slice(0, 5).join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="mt-6 rounded-xl border border-subtle bg-surface-raised p-5 text-sm text-muted">
          No concepts match “{query}”. Try a framework API name, alias, or
          broader term.
        </p>
      )}
    </section>
  );
}
