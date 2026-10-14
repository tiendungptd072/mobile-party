import type { CompileOptions } from "@mdx-js/mdx";

declare const remarkFoundations: NonNullable<
  CompileOptions["remarkPlugins"]
>[number];
export default remarkFoundations;
