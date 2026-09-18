"use client";

import { usePathname, useRouter } from "next/navigation";
import { TechnologySelector } from "@/features/technology-switcher/technology-selector.client";
import { useTechnologyPair } from "@/features/technology-switcher/use-technology-pair.client";
import {
  changeSourceTechnology,
  changeTargetTechnology,
  replaceTechnologyPairInPathname,
  type TechnologyPair,
} from "@/lib/technology-pair";
import type { TechnologyDefinition } from "@/types/technology";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

type TechnologySwitcherProps = {
  technologies: readonly TechnologyDefinition[];
};

export function TechnologySwitcher({ technologies }: TechnologySwitcherProps) {
  const messages = useLocaleMessages();
  const pathname = usePathname();
  const router = useRouter();
  const { pair, setPair } = useTechnologyPair();

  function handlePairChange(nextPair: TechnologyPair) {
    setPair(nextPair);

    const nextPathname = replaceTechnologyPairInPathname(pathname, nextPair);

    if (nextPathname !== pathname) {
      router.push(nextPathname);
    }
  }

  return (
    <div
      aria-label={messages.technology.path}
      className="flex min-w-0 items-center gap-2"
      role="group"
    >
      <TechnologySelector
        className="w-28 sm:w-36"
        isLabelVisuallyHidden
        label={messages.technology.source}
        technologies={technologies}
        value={pair.source}
        onChange={(technology) =>
          handlePairChange(changeSourceTechnology(pair, technology))
        }
      />
      <span className="shrink-0 text-muted" aria-hidden="true">
        →
      </span>
      <TechnologySelector
        className="w-28 sm:w-36"
        isLabelVisuallyHidden
        label={messages.technology.target}
        technologies={technologies}
        value={pair.target}
        onChange={(technology) =>
          handlePairChange(changeTargetTechnology(pair, technology))
        }
      />
    </div>
  );
}
