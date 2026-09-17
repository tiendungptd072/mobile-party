"use client";

import { useRouter } from "next/navigation";
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

type TechnologyPairFormProps = {
  technologies: readonly TechnologyDefinition[];
};

export function TechnologyPairForm({ technologies }: TechnologyPairFormProps) {
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
    router.push(getLearnUrl(pair));
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TechnologySelector
          label="I know"
          technologies={technologies}
          value={pair.source}
          onChange={(technology) =>
            setPair(changeSourceTechnology(pair, technology))
          }
        />
        <TechnologySelector
          label="I want to learn"
          technologies={technologies}
          value={pair.target}
          onChange={(technology) =>
            setPair(changeTargetTechnology(pair, technology))
          }
        />
      </div>

      <div className="rounded-lg border border-subtle bg-surface-raised p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Your learning path
        </p>
        <p className="mt-2 text-lg font-semibold">
          {source?.shortName} <span aria-hidden="true">→</span>{" "}
          <span className="sr-only">to</span> {target?.shortName}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button className="sm:min-w-36" size="large" type="submit">
          Start Learning
        </Button>
        <Button
          size="large"
          type="button"
          variant="secondary"
          onClick={() => router.push("/compare")}
        >
          Compare Concepts
        </Button>
        <Button
          size="large"
          type="button"
          variant="ghost"
          onClick={() => router.push("/dictionary")}
        >
          Browse Dictionary
        </Button>
      </div>
    </form>
  );
}
