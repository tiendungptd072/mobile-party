import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  error?: string;
  hint?: string;
  isLabelVisuallyHidden?: boolean;
  label: string;
  options: readonly SelectOption[];
};

export function Select({
  className,
  error,
  hint,
  id: providedId,
  isLabelVisuallyHidden = false,
  label,
  options,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const description = error ?? hint;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <label className="grid gap-2 text-sm font-medium" htmlFor={id}>
      <span className={isLabelVisuallyHidden ? "sr-only" : undefined}>
        {label}
      </span>
      <select
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-10 w-full rounded-lg border border-subtle bg-surface px-3 text-sm text-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-danger",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            disabled={option.disabled}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {description && (
        <span
          id={descriptionId}
          className={cn(
            "text-xs font-normal text-muted",
            error && "text-danger",
          )}
        >
          {description}
        </span>
      )}
    </label>
  );
}
