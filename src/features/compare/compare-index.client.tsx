"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTechnologyPair } from "@/features/technology-switcher/use-technology-pair.client";
import { getCompareUrl } from "@/lib/compare";
import type { Concept } from "@/types/concept";
import type { Technology, TechnologyDefinition } from "@/types/technology";
import { useState } from "react";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  useLocaleMessages,
} from "@/features/locale/use-locale-messages.client";
import { usePathname } from "next/navigation";

type CompareIndexProps = {
  concepts: readonly Concept[];
  technologies: readonly TechnologyDefinition[];
};

export function CompareIndex({ concepts, technologies }: CompareIndexProps) {
  const messages = useLocaleMessages();
  const locale = getLocaleFromPathname(usePathname());
  const { pair } = useTechnologyPair();
  const [visibleTechnologyIds, setVisibleTechnologyIds] = useState<
    readonly Technology[] | undefined
  >();
  const defaultTechnologyIds = [pair.source, pair.target];
  const selectedTechnologyIds = visibleTechnologyIds ?? defaultTechnologyIds;
  const selectedTechnologies = technologies.filter((technology) =>
    selectedTechnologyIds.includes(technology.id),
  );

  function toggleTechnology(technology: Technology) {
    setVisibleTechnologyIds((current) => {
      const selected = current ?? defaultTechnologyIds;

      if (selected.includes(technology)) {
        return selected.length === 1
          ? selected
          : selected.filter((id) => id !== technology);
      }

      return [...selected, technology];
    });
  }

  return (
    <section aria-label={messages.compare.matrix} className="mt-8">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="mb-3 text-sm font-medium">
          {messages.compare.showTechnologies}
        </legend>
        {technologies.map((technology) => {
          const isSelected = selectedTechnologyIds.includes(technology.id);

          return (
            <label
              key={technology.id}
              className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-subtle bg-surface px-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <input
                checked={isSelected}
                className="size-4 accent-[var(--color-accent)]"
                type="checkbox"
                onChange={() => toggleTechnology(technology.id)}
              />
              {technology.shortName}
            </label>
          );
        })}
      </fieldset>

      <div className="mt-6 hidden overflow-x-auto rounded-xl border border-subtle md:block">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-surface-raised text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">
                {messages.compare.concept}
              </th>
              {selectedTechnologies.map((technology) => (
                <th key={technology.id} className="px-5 py-3 font-medium">
                  {technology.name}
                </th>
              ))}
              <th className="px-5 py-3 font-medium">
                <span className="sr-only">{messages.compare.open}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((concept) => (
              <tr key={concept.id} className="border-t border-subtle">
                <th className="px-5 py-4 align-top font-medium">
                  <p>{concept.title}</p>
                  <p className="mt-1 max-w-xs font-normal leading-5 text-muted">
                    {concept.description}
                  </p>
                </th>
                {selectedTechnologies.map((technology) => (
                  <td
                    key={technology.id}
                    className="px-5 py-4 align-top text-muted"
                  >
                    {concept.implementations[technology.id]?.name ??
                      messages.compare.unavailable}
                  </td>
                ))}
                <td className="px-5 py-4 align-top">
                  <Link
                    className="font-medium text-accent hover:underline"
                    href={getLocalizedPath(
                      getCompareUrl(concept.slug, pair),
                      locale,
                    )}
                  >
                    {messages.compare.compare}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 md:hidden">
        {concepts.map((concept) => (
          <Card key={concept.id}>
            <CardHeader>
              <CardTitle>{concept.title}</CardTitle>
              <p className="text-sm leading-6 text-muted">
                {concept.description}
              </p>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                {selectedTechnologies.map((technology) => (
                  <div key={technology.id} className="flex gap-3">
                    <dt className="w-24 shrink-0 font-medium text-muted">
                      {technology.shortName}
                    </dt>
                    <dd>
                      {concept.implementations[technology.id]?.name ??
                        messages.compare.unavailable}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg border border-subtle bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-raised"
                href={getLocalizedPath(
                  getCompareUrl(concept.slug, pair),
                  locale,
                )}
              >
                {messages.compare.compareConcept}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
