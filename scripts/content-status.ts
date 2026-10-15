import { plugin } from "bun";
import { registerMdxLoader } from "./mdx-loader";

// This CLI runs on the server. Next normally resolves this boundary marker to its empty server entry.
await plugin({
  name: "server-only-cli",
  setup(build) {
    build.module("server-only", () => ({ exports: {}, loader: "object" }));
  },
});
registerMdxLoader();

const { getRoadmaps } = await import("@/lib/content/roadmaps");
const { LOCALES } = await import("@/lib/i18n/locale");
const { getContentStatus, formatContentStatus } =
  await import("@/lib/content/status");

const cells = LOCALES.flatMap((locale) =>
  getContentStatus(getRoadmaps(locale), locale),
);
console.log(formatContentStatus(cells));
const { foundationDefinitions } = await import("@content/foundations");
const { getConcepts } = await import("@/lib/content/concepts");
const {
  getFoundationStatus,
  formatFoundationStatus,
  getFoundationLinkRoutes,
  readBuiltPageAnchors,
} = await import("@/lib/content/foundation-status");
const foundations = getFoundationStatus(foundationDefinitions, {
  conceptSlugs: new Set(getConcepts().map((concept) => concept.slug)),
  routes: getFoundationLinkRoutes(),
  ...(process.argv.includes("--built")
    ? { pageAnchors: readBuiltPageAnchors }
    : {}),
});
console.log(formatFoundationStatus(foundations));
if (
  process.argv.includes("--strict") &&
  (cells.some((cell) => !cell.code || !cell.translated) ||
    foundations.issues.some((issue) => issue.severity === "error"))
) {
  process.exitCode = 1;
}
