import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = {
  primary:
    "border-transparent bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border-subtle bg-surface text-foreground hover:bg-surface-raised",
  ghost: "border-transparent text-foreground hover:bg-surface-raised",
  danger: "border-danger/30 bg-danger-soft text-danger hover:opacity-90",
} as const;

const buttonSizes = {
  small: "h-8 px-3 text-sm",
  medium: "h-10 px-4 text-sm",
  large: "h-12 px-5 text-base",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  className,
  size = "medium",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}
