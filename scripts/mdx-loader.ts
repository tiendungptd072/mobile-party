import { plugin } from "bun";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkFoundations from "./remark-foundations.mjs";

/** Match Next's local MDX transforms for Bun-only tests and content reporting. */
export function registerMdxLoader() {
  plugin({
    name: "local-foundations-mdx",
    setup(build) {
      build.onLoad({ filter: /\.mdx$/ }, async ({ path }) => ({
        contents: String(
          await compile(
            { value: await Bun.file(path).text(), path },
            { remarkPlugins: [remarkGfm, remarkFoundations] },
          ),
        ),
        loader: "js",
      }));
    },
  });
}
