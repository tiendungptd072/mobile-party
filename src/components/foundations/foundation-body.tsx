import "server-only";
import { isValidElement, type ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/ui/callout";
import { ContentReferences } from "@/components/learning/content-references";
import { loadSnippetPath } from "@/lib/content/snippets";
import { ContentValidationError } from "@/lib/content/validation";
import { getTechnologies } from "@/lib/content/technologies";
import { getMessages } from "@/lib/i18n/messages";
import { isCodeLanguage } from "@/lib/shiki/highlighter";
import type { FoundationArticle, FoundationSnippet } from "@/types/foundation";

/** Binds authored static components to validated article data entirely on the server. */
export function FoundationBody({ article }: { article: FoundationArticle }) {
  const { metadata, body, locale } = article;
  const path = "foundations." + metadata.slug + "." + locale;
  function Citation({ source }: { source: string }) {
    const index = metadata.references.findIndex(
      (entry) => entry.id === source.trim(),
    );
    if (index < 0)
      throw new ContentValidationError(
        path,
        "unknown citation source: " + source,
      );
    const reference = metadata.references[index];
    return (
      <a
        href={"#source-" + reference.id}
        aria-label={reference.title}
        className="text-accent underline underline-offset-4"
      >
        {"[" + (index + 1) + "]"}
      </a>
    );
  }
  function Figure({ id }: { id: string }) {
    const figure = body.foundation.figures.find(
      (entry) => entry.id === id.trim(),
    );
    if (!figure)
      throw new ContentValidationError(path, "unknown figure: " + id);
    return (
      <figure
        id={"figure-" + figure.id}
        className="not-prose my-6 scroll-mt-24"
      >
        {/* Static, authored diagrams are served directly, without image optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
        <figcaption className="mt-2 text-sm text-muted">
          {figure.caption}
          {figure.sources.map((source) => (
            <span key={source}>
              {" "}
              <Citation source={source} />
            </span>
          ))}
        </figcaption>
      </figure>
    );
  }
  async function Snippet({ path: source, language }: FoundationSnippet) {
    const snippet = body.foundation.snippets.find(
      (entry) => entry.path === source.trim() && entry.language === language,
    );
    if (!snippet)
      throw new ContentValidationError(
        path,
        "unknown snippet reference: " + source,
      );
    return (
      <div className="not-prose my-6">
        <CodeBlock
          code={loadSnippetPath(snippet.path, snippet.language)}
          filename={snippet.path.split("/").at(-1)}
          language={snippet.language}
        />
      </div>
    );
  }
  async function Pre({ children, ...props }: ComponentProps<"pre">) {
    if (
      !isValidElement<{ className?: string; children?: unknown }>(children) ||
      typeof children.props.children !== "string"
    ) {
      throw new ContentValidationError(
        path,
        "expected a static fenced code block",
      );
    }
    const language = children.props.className?.replace(/^language-/, "");
    if (!language)
      return (
        <pre {...props} className="overflow-x-auto">
          {children}
        </pre>
      );
    if (!isCodeLanguage(language))
      throw new ContentValidationError(
        path,
        "unsupported fenced code language: " + language,
      );
    return (
      <div className="not-prose my-6">
        <CodeBlock
          code={children.props.children}
          language={language}
          filename={getMessages(locale).codeExample}
        />
      </div>
    );
  }
  const components = {
    Citation,
    Figure,
    Snippet,
    pre: Pre,
    blockquote: ({ children }) => (
      <Callout
        className="not-prose my-6"
        title={getMessages(locale).foundations.note}
      >
        {children}
      </Callout>
    ),
    table: ({ children, ...props }) => (
      <div
        className="my-6 overflow-x-auto rounded-lg border border-subtle px-4"
        role="region"
        aria-label={getMessages(locale).foundations.table}
        tabIndex={0}
      >
        <table {...props}>{children}</table>
      </div>
    ),
  } satisfies MDXComponents;
  const Body = body.default;
  return <Body components={components} />;
}

export function FoundationReferences({
  article,
}: {
  article: FoundationArticle;
}) {
  const messages = getMessages(article.locale).learn;
  return (
    <ContentReferences
      title={messages.references}
      description={messages.referencesDescription}
      references={article.metadata.references}
      referenceIds={article.metadata.references.map(
        (entry) => "source-" + entry.id,
      )}
      kindLabels={messages.referenceKinds}
      opensInNewTab={messages.opensInNewTab}
      verifiedLabel={messages.verifiedReference}
      versionLabel={messages.referenceVersion}
      technologyNames={Object.fromEntries(
        getTechnologies().map((technology) => [technology.id, technology.name]),
      )}
    />
  );
}
