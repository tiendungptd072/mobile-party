import createMDX from "@next/mdx";
import { resolve } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", resolve("scripts/remark-foundations.mjs")],
  },
});

export default withMDX(nextConfig);
