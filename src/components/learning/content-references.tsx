import type { ContentReference, ContentReferenceKind } from "@/types/concept";
import type { Technology } from "@/types/technology";

type ContentReferencesProps = {
  description: string;
  kindLabels: Readonly<Record<ContentReferenceKind, string>>;
  opensInNewTab: string;
  references: readonly ContentReference[];
  technologyNames: Readonly<Partial<Record<Technology, string>>>;
  title: string;
  verifiedLabel: string;
  versionLabel: string;
};

/** Renders verified external sources without introducing client-side behavior. */
export function ContentReferences({
  description,
  kindLabels,
  opensInNewTab,
  references,
  technologyNames,
  title,
  verifiedLabel,
  versionLabel,
}: ContentReferencesProps) {
  if (references.length === 0) return null;

  return (
    <section className="mt-10 max-w-4xl" aria-labelledby="references-title">
      <h2 id="references-title" className="text-2xl font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {references.map((reference) => (
          <li
            key={reference.url}
            className="rounded-xl border border-subtle bg-surface p-5"
          >
            <a
              className="font-semibold text-accent hover:underline"
              href={reference.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {reference.title}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> ({opensInNewTab})</span>
            </a>
            <p className="mt-2 text-xs leading-5 text-muted">
              {reference.technology
                ? `${technologyNames[reference.technology] ?? reference.technology} · `
                : ""}
              {kindLabels[reference.kind]}
              {reference.version
                ? ` · ${versionLabel.replace("{version}", reference.version)}`
                : ""}
              {` · ${verifiedLabel.replace("{date}", reference.verifiedAt)}`}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
