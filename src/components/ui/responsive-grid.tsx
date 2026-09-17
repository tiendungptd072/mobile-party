import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

type ResponsiveGridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: keyof typeof columnClasses;
};

export function ResponsiveGrid({
  className,
  columns = 3,
  ...props
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        columnClasses[columns],
        className,
      )}
      {...props}
    />
  );
}
