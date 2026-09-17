import { CodeComparisonView } from "@/components/compare/code-comparison.client";
import { highlightCode } from "@/lib/shiki/highlighter";
import type { ConceptImplementation } from "@/types/concept";
import type { TechnologyDefinition } from "@/types/technology";

type CodeImplementation = ConceptImplementation & {
  code: string;
};

type CodeComparisonProps = {
  source: {
    implementation: CodeImplementation;
    technology: TechnologyDefinition;
  };
  target: {
    implementation: CodeImplementation;
    technology: TechnologyDefinition;
  };
};

/** Highlights both implementations on the server before interactive rendering. */
export async function CodeComparison({ source, target }: CodeComparisonProps) {
  const [sourceHtml, targetHtml] = await Promise.all([
    highlightCode(source.implementation.code, source.implementation.language),
    highlightCode(target.implementation.code, target.implementation.language),
  ]);

  return (
    <CodeComparisonView
      source={{
        code: source.implementation.code,
        filename: source.implementation.filename,
        highlightedCode: sourceHtml,
        implementationName: source.implementation.name,
        technology: source.technology,
      }}
      target={{
        code: target.implementation.code,
        filename: target.implementation.filename,
        highlightedCode: targetHtml,
        implementationName: target.implementation.name,
        technology: target.technology,
      }}
    />
  );
}
