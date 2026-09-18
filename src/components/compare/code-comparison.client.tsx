"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs.client";
import { cn } from "@/lib/utils/cn";
import type { TechnologyDefinition } from "@/types/technology";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

type CodePanel = {
  code: string;
  filename?: string;
  highlightedCode: string;
  implementationName: string;
  technology: TechnologyDefinition;
};

type CodeComparisonViewProps = {
  source: CodePanel;
  target: CodePanel;
};

export function CodeComparisonView({
  source,
  target,
}: CodeComparisonViewProps) {
  const messages = useLocaleMessages();
  const [isSwapped, setIsSwapped] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [copiedTechnology, setCopiedTechnology] = useState<string>();
  const leftPanel = isSwapped ? target : source;
  const rightPanel = isSwapped ? source : target;

  async function handleCopy(panel: CodePanel) {
    try {
      await navigator.clipboard.writeText(panel.code);
      setCopiedTechnology(panel.technology.id);
    } catch {
      setCopiedTechnology(undefined);
    }
  }

  return (
    <section className={cn("w-full", isFullWidth ? "max-w-none" : "max-w-5xl")}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">
          {messages.code.sideBySide}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="small"
            variant="secondary"
            onClick={() => setIsSwapped((value) => !value)}
          >
            {messages.code.swapSides}
          </Button>
          <Button
            size="small"
            variant="ghost"
            aria-pressed={isFullWidth}
            onClick={() => setIsFullWidth((value) => !value)}
          >
            {isFullWidth
              ? messages.code.constrainWidth
              : messages.code.fullWidth}
          </Button>
        </div>
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-2">
        <CodePanelView
          panel={leftPanel}
          onCopy={handleCopy}
          copiedTechnology={copiedTechnology}
        />
        <CodePanelView
          panel={rightPanel}
          onCopy={handleCopy}
          copiedTechnology={copiedTechnology}
        />
      </div>

      <div className="md:hidden">
        <Tabs
          key={leftPanel.technology.id}
          ariaLabel={messages.code.comparison}
          defaultValue={leftPanel.technology.id}
          items={[leftPanel, rightPanel].map((panel) => ({
            content: (
              <CodePanelView
                copiedTechnology={copiedTechnology}
                onCopy={handleCopy}
                panel={panel}
              />
            ),
            label: panel.technology.shortName,
            value: panel.technology.id,
          }))}
        />
      </div>
    </section>
  );
}

type CodePanelViewProps = {
  copiedTechnology?: string;
  onCopy(panel: CodePanel): void;
  panel: CodePanel;
};

function CodePanelView({
  copiedTechnology,
  onCopy,
  panel,
}: CodePanelViewProps) {
  const messages = useLocaleMessages();
  const hasCopied = copiedTechnology === panel.technology.id;

  return (
    <article className="overflow-hidden rounded-xl border border-subtle bg-surface">
      <header className="flex items-start justify-between gap-3 border-b border-subtle bg-surface-raised px-4 py-3">
        <div>
          <h3 className="font-semibold">{panel.technology.shortName}</h3>
          <p className="mt-1 text-sm text-muted">{panel.implementationName}</p>
        </div>
        <Button size="small" variant="ghost" onClick={() => onCopy(panel)}>
          {hasCopied ? messages.code.copied : messages.code.copy}
        </Button>
      </header>
      <p className="border-b border-subtle px-4 py-2 font-mono text-xs text-muted">
        {panel.filename ?? panel.technology.name}
      </p>
      <div
        className="[&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6"
        dangerouslySetInnerHTML={{ __html: panel.highlightedCode }}
      />
    </article>
  );
}
