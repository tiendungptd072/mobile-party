import { mock } from "bun:test";
import { plugin } from "bun";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkFoundations from "../../scripts/remark-foundations.mjs";

// Next.js resolves this build-time boundary marker; Bun runs these tests on the server.
mock.module("server-only", () => ({}));

// Match Next's MDX transforms when tests import the real article registry.
plugin({
  name: "local-foundations-mdx",
  setup(build) {
    build.onLoad({ filter: /\.mdx$/ }, async ({ path }) => ({
      contents: String(
        await compile(
          { value: await Bun.file(path).text(), path },
          {
            remarkPlugins: [remarkGfm, remarkFoundations],
          },
        ),
      ),
      loader: "js",
    }));
  },
});
