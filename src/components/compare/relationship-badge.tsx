"use client";

import { Badge } from "@/components/ui/badge";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";
import type { Relationship } from "@/types/concept";

type RelationshipBadgeProps = {
  relationship: Relationship;
};

export function RelationshipBadge({ relationship }: RelationshipBadgeProps) {
  const messages = useLocaleMessages();
  const detail = {
    equivalent: {
      label: messages.compare.equivalent,
      variant: "success" as const,
    },
    similar: { label: messages.compare.similar, variant: "accent" as const },
    different: {
      label: messages.compare.different,
      variant: "warning" as const,
    },
  }[relationship];

  return <Badge variant={detail.variant}>{detail.label}</Badge>;
}
