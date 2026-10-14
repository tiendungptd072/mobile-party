import "server-only";
import { readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { ContentValidationError } from "@/lib/content/validation";
import type { LessonStage } from "@/types/roadmap";
import type { CodeLanguage, Technology } from "@/types/technology";

export type SnippetSource =
  | { kind: "concept"; slug: string; stage: LessonStage["id"] }
  | { kind: "recipe"; slug: string };

const EXTENSIONS = {
  tsx: "tsx",
  typescript: "tsx",
  kotlin: "kt",
  dart: "dart",
  swift: "swift",
  json: "json",
  bash: "sh",
} satisfies Record<CodeLanguage, string>;

/** Extracts one display region, hiding package declarations and support code. */
export function extractSnippetCode(source: string, path: string): string {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const starts = lines.flatMap((line, index) =>
    line.trim() === "// #region show" ? [index] : [],
  );
  const ends = lines.flatMap((line, index) =>
    line.trim() === "// #endregion" ? [index] : [],
  );

  if (
    (starts.length > 0 || ends.length > 0) &&
    (starts.length !== 1 || ends.length !== 1 || ends[0] <= starts[0])
  ) {
    throw new ContentValidationError(
      path,
      "expected one complete display region",
    );
  }

  const code = (
    starts.length === 0 ? lines : lines.slice(starts[0] + 1, ends[0])
  )
    .join("\n")
    .trim();
  if (!code)
    throw new ContentValidationError(path, "snippet has no display code");
  return code;
}

function getSnippetPath(
  source: SnippetSource,
  technology: Technology,
  language: CodeLanguage,
  snippet?: string,
): string {
  const directory =
    source.kind === "recipe" ? `recipes/${source.slug}` : source.slug;
  const stage = source.kind === "recipe" ? "main" : source.stage;
  return (
    snippet ?? `${directory}/${technology}/${stage}.${EXTENSIONS[language]}`
  );
}

/** Returns undefined only for an absent file; invalid regions and filesystem errors still fail. */
export function loadOptionalSnippet(
  source: SnippetSource,
  technology: Technology,
  language: CodeLanguage,
): string | undefined {
  return readSnippet(source, technology, language);
}

/** Reads a required snippet; explicit paths preserve distinct Learn examples. */
export function loadSnippet(
  source: SnippetSource,
  technology: Technology,
  language: CodeLanguage,
  snippet?: string,
): string {
  const code = readSnippet(source, technology, language, snippet);
  if (code === undefined) {
    throw new ContentValidationError(
      `content/snippets/${getSnippetPath(source, technology, language, snippet)}`,
      "snippet file is missing",
    );
  }
  return code;
}

function readSnippet(
  source: SnippetSource,
  technology: Technology,
  language: CodeLanguage,
  snippet?: string,
): string | undefined {
  const root = resolve(process.cwd(), "content/snippets");
  const path = getSnippetPath(source, technology, language, snippet);
  const absolutePath = resolve(root, path);
  const relativePath = relative(root, absolutePath);

  if (
    isAbsolute(path) ||
    relativePath.startsWith("..") ||
    isAbsolute(relativePath)
  ) {
    throw new ContentValidationError(
      path,
      "snippet path must stay inside content/snippets",
    );
  }

  let contents: string;
  try {
    contents = readFileSync(absolutePath, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
  return extractSnippetCode(contents, `content/snippets/${path}`);
}
