"use client";

import { Select } from "@/components/ui/select";
import { isTechnologyId } from "@/lib/technology-pair";
import type { Technology, TechnologyDefinition } from "@/types/technology";

type TechnologySelectorProps = {
  className?: string;
  excludedTechnology?: Technology;
  isLabelVisuallyHidden?: boolean;
  label: string;
  onChange(value: Technology): void;
  technologies: readonly TechnologyDefinition[];
  value: Technology;
};

export function TechnologySelector({
  className,
  excludedTechnology,
  isLabelVisuallyHidden,
  label,
  onChange,
  technologies,
  value,
}: TechnologySelectorProps) {
  return (
    <Select
      className={className}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      label={label}
      options={technologies.map((technology) => ({
        disabled: technology.id === excludedTechnology,
        label: technology.shortName,
        value: technology.id,
      }))}
      value={value}
      onChange={(event) => {
        if (isTechnologyId(event.target.value)) {
          onChange(event.target.value);
        }
      }}
    />
  );
}
