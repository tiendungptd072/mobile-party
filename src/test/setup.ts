import { mock } from "bun:test";
import { registerMdxLoader } from "../../scripts/mdx-loader";

// Next.js resolves this build-time boundary marker; Bun runs these tests on the server.
mock.module("server-only", () => ({}));

registerMdxLoader();
