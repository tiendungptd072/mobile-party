import { plugin } from "bun";

// This CLI runs on the server. Next normally resolves this boundary marker to its empty server entry.
await plugin({
  name: "server-only-cli",
  setup(build) {
    build.module("server-only", () => ({ exports: {}, loader: "object" }));
  },
});

const { getRoadmaps } = await import("@/lib/content/roadmaps");
const { LOCALES } = await import("@/lib/i18n/locale");
const { getContentStatus, formatContentStatus } =
  await import("@/lib/content/status");

const cells = LOCALES.flatMap((locale) =>
  getContentStatus(getRoadmaps(locale), locale),
);
console.log(formatContentStatus(cells));
if (
  process.argv.includes("--strict") &&
  cells.some((cell) => !cell.code || !cell.translated)
) {
  process.exitCode = 1;
}
