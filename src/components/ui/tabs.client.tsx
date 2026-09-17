"use client";

import { useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TabItem = {
  content: ReactNode;
  disabled?: boolean;
  label: string;
  value: string;
};

type TabsProps = {
  ariaLabel: string;
  className?: string;
  defaultValue?: string;
  items: readonly TabItem[];
};

export function Tabs({ ariaLabel, className, defaultValue, items }: TabsProps) {
  const id = useId();
  const initialItem =
    items.find((item) => item.value === defaultValue && !item.disabled) ??
    items.find((item) => !item.disabled);
  const [activeValue, setActiveValue] = useState(initialItem?.value ?? "");

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentValue: string,
  ) {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIndex = enabledItems.findIndex(
      (item) => item.value === currentValue,
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();

    const nextItem = enabledItems[nextIndex];
    const itemIndex = items.findIndex((item) => item.value === nextItem.value);

    setActiveValue(nextItem.value);
    document.getElementById(`${id}-tab-${itemIndex}`)?.focus();
  }

  if (!initialItem) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        aria-label={ariaLabel}
        className="flex gap-1 overflow-x-auto rounded-lg border border-subtle bg-surface-raised p-1"
        role="tablist"
      >
        {items.map((item, index) => {
          const isActive = item.value === activeValue;

          return (
            <button
              key={item.value}
              id={`${id}-tab-${index}`}
              type="button"
              aria-controls={`${id}-panel-${index}`}
              aria-selected={isActive}
              className={cn(
                "min-h-9 shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
                isActive && "bg-surface text-foreground shadow-sm",
              )}
              disabled={item.disabled}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveValue(item.value)}
              onKeyDown={(event) => handleKeyDown(event, item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.value}
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          className="mt-4"
          hidden={item.value !== activeValue}
          role="tabpanel"
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
