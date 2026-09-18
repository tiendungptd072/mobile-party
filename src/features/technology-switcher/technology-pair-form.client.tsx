"use client";

import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { TechnologySelector } from "@/features/technology-switcher/technology-selector.client";
import { useTechnologyPair } from "@/features/technology-switcher/use-technology-pair.client";
import {
  changeSourceTechnology,
  changeTargetTechnology,
  getLearnUrl,
} from "@/lib/technology-pair";
import type { TechnologyDefinition } from "@/types/technology";
import {
  getLocaleFromPathname,
  useLocaleMessages,
} from "@/features/locale/use-locale-messages.client";

type TechnologyPairFormProps = {
  technologies: readonly TechnologyDefinition[];
};

export function TechnologyPairForm({ technologies }: TechnologyPairFormProps) {
  const messages = useLocaleMessages();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const router = useRouter();
  const { pair, setPair } = useTechnologyPair();
  const source = technologies.find(
    (technology) => technology.id === pair.source,
  );
  const target = technologies.find(
    (technology) => technology.id === pair.target,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/${locale}${getLearnUrl(pair)}`);
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TechnologySelector
          label={messages.technology.know}
          technologies={technologies}
          value={pair.source}
          onChange={(technology) =>
            setPair(changeSourceTechnology(pair, technology))
          }
        />
        <TechnologySelector
          label={messages.technology.learn}
          technologies={technologies}
          value={pair.target}
          onChange={(technology) =>
            setPair(changeTargetTechnology(pair, technology))
          }
        />
      </div>

      <div className="rounded-lg border border-subtle bg-surface-raised p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {messages.technology.learningPath}
        </p>
        <p className="mt-2 text-lg font-semibold">
          {source?.shortName} <span aria-hidden="true">→</span>{" "}
          <span className="sr-only">{messages.technology.to}</span>{" "}
          {target?.shortName}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button className="sm:min-w-36" size="large" type="submit">
          {messages.technology.start}
        </Button>
        <Button
          size="large"
          type="button"
          variant="secondary"
          onClick={() => router.push(`/${locale}/compare`)}
        >
          {messages.technology.compare}
        </Button>
        <Button
          size="large"
          type="button"
          variant="ghost"
          onClick={() => router.push(`/${locale}/dictionary`)}
        >
          {messages.technology.dictionary}
        </Button>
      </div>
    </form>
  );
}
