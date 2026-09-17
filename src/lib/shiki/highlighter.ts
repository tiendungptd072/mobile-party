import "server-only";

import { getSingletonHighlighter } from "shiki";
import { CODE_LANGUAGES, type CodeLanguage } from "@/types/technology";

const themes = ["github-light", "github-dark"] as const;

export function isCodeLanguage(value: string): value is CodeLanguage {
  return CODE_LANGUAGES.some((language) => language === value);
}

/** Highlights code once on the server using the shared Shiki instance. */
export async function highlightCode(
  code: string,
  language: CodeLanguage,
): Promise<string> {
  const highlighter = await getSingletonHighlighter({
    langs: [...CODE_LANGUAGES],
    themes: [...themes],
  });

  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: themes[0],
      dark: themes[1],
    },
    defaultColor: false,
  });
}
