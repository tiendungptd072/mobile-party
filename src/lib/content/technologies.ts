import { rawTechnologies } from "@content/technologies";
import { validateTechnologies } from "@/lib/content/schema";
import { TECHNOLOGY_IDS, type Technology } from "@/types/technology";

const technologies = validateTechnologies(rawTechnologies);

export function getTechnologies() {
  return technologies;
}

export function getTechnologyById(id: Technology) {
  return technologies.find((technology) => technology.id === id);
}

export function isTechnology(value: string): value is Technology {
  return TECHNOLOGY_IDS.some((technology) => technology === value);
}
