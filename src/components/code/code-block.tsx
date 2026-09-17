import { highlightCode } from "@/lib/shiki/highlighter";
import type { CodeLanguage } from "@/types/technology";

type CodeBlockProps = {
  code: string;
  filename?: string;
  language: CodeLanguage;
};

/** Renders syntax-highlighted code without shipping Shiki to the browser. */
export async function CodeBlock({ code, filename, language }: CodeBlockProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <figure className="overflow-hidden rounded-lg border border-subtle bg-surface">
      <figcaption className="flex items-center justify-between gap-3 border-b border-subtle bg-surface-raised px-4 py-2 font-mono text-xs text-muted">
        <span>{filename ?? "Code example"}</span>
        <span>{language}</span>
      </figcaption>
      <div
        className="[&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  );
}
