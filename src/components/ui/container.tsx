import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const containerWidths = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-6xl",
} as const;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: keyof typeof containerWidths;
};

export function Container({
  className,
  width = "wide",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerWidths[width],
        className,
      )}
      {...props}
    />
  );
}
