import { mock } from "bun:test";

// Next.js resolves this build-time boundary marker; Bun runs these tests on the server.
mock.module("server-only", () => ({}));
