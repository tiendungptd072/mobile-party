import { Badge } from "@/components/ui/badge";
import type { Relationship } from "@/types/concept";

const relationshipDetails = {
  equivalent: { label: "= Equivalent", variant: "success" },
  similar: { label: "≈ Similar concept", variant: "accent" },
  different: { label: "≠ Different mental model", variant: "warning" },
} as const;

type RelationshipBadgeProps = {
  relationship: Relationship;
};

export function RelationshipBadge({ relationship }: RelationshipBadgeProps) {
  const detail = relationshipDetails[relationship];

  return <Badge variant={detail.variant}>{detail.label}</Badge>;
}
