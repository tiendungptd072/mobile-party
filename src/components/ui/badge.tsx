import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const badgeVariants = {
  neutral: "border-subtle bg-surface-raised text-foreground",
  accent: "border-accent/25 bg-info-soft text-info",
  success: "border-success/25 bg-success-soft text-success",
  warning: "border-warning/25 bg-warning-soft text-warning",
  danger: "border-danger/25 bg-danger-soft text-danger",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof badgeVariants;
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
