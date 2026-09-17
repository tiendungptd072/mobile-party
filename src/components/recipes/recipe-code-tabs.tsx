import { CodeBlock } from "@/components/code/code-block";
import { Tabs } from "@/components/ui/tabs.client";
import type { RecipeImplementation } from "@/types/recipe";
import type { TechnologyDefinition } from "@/types/technology";

type RecipeCodeTabsProps = {
  implementations: Readonly<
    Partial<Record<TechnologyDefinition["id"], RecipeImplementation>>
  >;
  technologies: readonly TechnologyDefinition[];
};

/** Renders server-highlighted recipe implementations inside accessible tabs. */
export function RecipeCodeTabs({
  implementations,
  technologies,
}: RecipeCodeTabsProps) {
  const items = technologies.flatMap((technology) => {
    const implementation = implementations[technology.id];

    if (!implementation) {
      return [];
    }

    return [
      {
        value: technology.id,
        label: technology.shortName,
        content: (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-muted">
              {implementation.summary}
            </p>
            <CodeBlock
              code={implementation.code}
              filename={implementation.filename}
              language={implementation.language}
            />
          </div>
        ),
      },
    ];
  });

  return <Tabs ariaLabel="Recipe implementations" items={items} />;
}
