import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const calloutTones = {
  info: "border-info/30 bg-info-soft text-info",
  success: "border-success/30 bg-success-soft text-success",
  warning: "border-warning/30 bg-warning-soft text-warning",
  danger: "border-danger/30 bg-danger-soft text-danger",
} as const;

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tone?: keyof typeof calloutTones;
  children: ReactNode;
};

export function Callout({
  children,
  className,
  title,
  tone = "info",
  ...props
}: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-xl border p-4 text-sm",
        calloutTones[tone],
        className,
      )}
      {...props}
    >
      <p className="font-semibold">{title}</p>
      <div className="mt-1 leading-6 text-foreground">{children}</div>
    </aside>
  );
}
