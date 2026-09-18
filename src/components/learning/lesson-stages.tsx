import { CodeComparison } from "@/components/compare/code-comparison";
import type { LessonStage } from "@/types/roadmap";
import type { TechnologyDefinition } from "@/types/technology";

type LessonStagesProps = {
  sourceTechnology: TechnologyDefinition;
  stageLabel: string;
  stages: readonly LessonStage[];
  targetTechnology: TechnologyDefinition;
};

/** Renders progressive lesson stages and optional server-highlighted examples. */
export function LessonStages({
  sourceTechnology,
  stageLabel,
  stages,
  targetTechnology,
}: LessonStagesProps) {
  return (
    <ol className="mt-5 space-y-5">
      {stages.map((stage, index) => {
        const sourceExample = stage.examples?.[sourceTechnology.id];
        const targetExample = stage.examples?.[targetTechnology.id];
        const sourceCode = sourceExample?.code;
        const targetCode = targetExample?.code;
        const hasComparison =
          sourceExample && targetExample && sourceCode && targetCode;

        return (
          <li
            key={stage.id}
            className="rounded-xl border border-subtle bg-surface p-5 sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {stageLabel.replace("{count}", String(index + 1))}
            </p>
            <h3 className="mt-3 text-lg font-semibold">{stage.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              {stage.description}
            </p>
            {hasComparison ? (
              <div className="mt-5">
                <CodeComparison
                  source={{
                    implementation: { ...sourceExample, code: sourceCode },
                    technology: sourceTechnology,
                  }}
                  target={{
                    implementation: { ...targetExample, code: targetCode },
                    technology: targetTechnology,
                  }}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
