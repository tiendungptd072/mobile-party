import { TECHNOLOGY_IDS, type Technology } from "@/types/technology";

export type TechnologyPair = {
  source: Technology;
  target: Technology;
};

export const DEFAULT_TECHNOLOGY_PAIR: TechnologyPair = {
  source: "react-native",
  target: "kotlin",
};

export function isTechnologyId(value: string): value is Technology {
  return TECHNOLOGY_IDS.some((technology) => technology === value);
}

export function createTechnologyPair(
  source: string,
  target: string,
): TechnologyPair | undefined {
  if (!isTechnologyId(source) || !isTechnologyId(target) || source === target) {
    return undefined;
  }

  return { source, target };
}

export function serializeTechnologyPair(pair: TechnologyPair): string {
  return `${pair.source}:${pair.target}`;
}

export function changeSourceTechnology(
  pair: TechnologyPair,
  source: Technology,
): TechnologyPair {
  return source === pair.target
    ? { source, target: pair.source }
    : { source, target: pair.target };
}

export function changeTargetTechnology(
  pair: TechnologyPair,
  target: Technology,
): TechnologyPair {
  return target === pair.source
    ? { source: pair.target, target }
    : { source: pair.source, target };
}

export function parseTechnologyPair(value: string): TechnologyPair | undefined {
  const [source, target, extra] = value.split(":");

  if (extra !== undefined) {
    return undefined;
  }

  return createTechnologyPair(source, target);
}

export function getLearnUrl(
  pair: TechnologyPair,
  conceptSlug?: string,
): string {
  const baseUrl = `/learn/${pair.source}/${pair.target}`;

  return conceptSlug
    ? `${baseUrl}/${encodeURIComponent(conceptSlug)}`
    : baseUrl;
}

export function replaceTechnologyPairInPathname(
  pathname: string,
  pair: TechnologyPair,
): string {
  return pathname.replace(
    /^\/((?:en|vi)\/)?(learn|compare)\/[^/]+\/[^/]+(?=\/|$)/,
    (_match, localePrefix: string | undefined, section: string) =>
      `/${localePrefix ?? ""}${section}/${pair.source}/${pair.target}`,
  );
}
